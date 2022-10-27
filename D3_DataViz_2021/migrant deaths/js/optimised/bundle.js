(function (React$1, ReactDOM, d3, topojson, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const jsonUrl = 'http://localhost:8080/SourceFiles/json/countries-50m.json';
  let it$1 = 0;

  const useData = () => {
    const [landData, setData] = ipi.useState({obj: 'landData', state: null});

    if(it$1 == 0) {
      it$1 = 1;
      d3.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
        setData({obj: 'landData', state: {
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        }});
      });
    } else {
      it$1 = 0;
    }

    return landData;
  };

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';
  let it = 0;

  const useMigrantData = () => {
    const [deaths, setData] = ipi.useState({obj: 'deaths', state: null});
    if(it == 0) {
      it = 1;
      const row = d => {
        d['Total Dead and Missing'] = +d['Total Dead and Missing'];
        d['Reported Date'] = new Date(d['Reported Date']);
        d.coords = d['Location Coordinates'].split(',').map(d => +d).reverse();
        return d;
      };
      d3.csv(csvUrl, row).then(deaths => setData({obj: 'deaths', state: deaths}));
    } else {
      it = 0;
    }

    return deaths;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();
  let landMarks;

  const Marks$1 = ({
    worldAtlas: {land, interiors },
    migrants,
    sizeScale,
    sizeValue
  }) => (
    React.createElement('g', {className: "marks"}, [

        landMarks = landMarks ? landMarks : React.createElement('g', null, [
            React.createElement('path', {className: "pSphere", d: path({ type: 'Sphere' })}),
            React.createElement('path', {className: "pGraticules", d: path(graticule())}),

              land.features.map(feature => (
                React.createElement('path', {className: "pLand", d: path(feature)})
              )),

            React.createElement('path', {className: "pInteriors", d: path(interiors)})
          ]),

      migrants.map(d => {
        const [x, y] = projection(d.coords);
        return React.createElement('circle', {cx: x, cy: y, r: sizeScale(sizeValue(d))})
      })
    ])
  );

  let sizeScale;

  const BubbleMap = ({migrants, filteredData, worldAtlas}) => {
    const sizeValue = d => d['Total Dead and Missing'];
    const maxRadius = 15;

    if(!sizeScale) {
      sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(migrants, sizeValue)])
        .range([0, maxRadius]);
    }

    return (
      Marks$1({
        worldAtlas: worldAtlas,
        migrants: filteredData,
        sizeScale: sizeScale,
        sizeValue: sizeValue}
      )
    );
  };

  const Marks = ({
    binnedData, xScale, yScale, tooltipFormat, innerHeight, barOffset
  }) =>
    binnedData.map(d => (
    React.createElement('rect', {
      x: xScale(d.x0),
      y: yScale(d.y),
      width: xScale(d.x1) - xScale(d.x0) - barOffset,
      height: innerHeight - yScale(d.y),
      className: "mark"
    }, [
      React.createElement('title', null, [tooltipFormat(d.y)])
    ])
  ));

  const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset}) =>
    xScale.ticks().map(tickValue => (
      React.createElement('g', {
        key: tickValue, transform: `translate(${xScale(tickValue)}, 0)`,
        className: "tick"
      }, [
        React.createElement('line', {y2: innerHeight}),
        React.createElement('text', {
          dy: "0.71em",
          y: innerHeight + (tickOffset ? tickOffset : 3),
          style: {textAnchor: 'middle'}
        }, [
          tickFormat(tickValue)
        ])
      ])
    ));

  const AxisLeft = ({yScale, innerWidth, tickOffset}) =>
    yScale.ticks().map(tickValue => (
      React.createElement('g', {className: "tick", transform: `translate(0, ${yScale(tickValue)})`}, [
        React.createElement('line', {x2: innerWidth}),
        React.createElement('text', {
          key: tickValue,
          x: -(tickOffset ? tickOffset : 3),
          dy: "0.32em",
          style: {textAnchor: 'end'}
        }, [
          tickValue
        ])
      ])
    ));

  const margin = { top: 0, right: 30, bottom: 20, left: 40 };
  const xAxisLabelOffset = 50;
  const yAxisLabelOffset = 30;
  const tickOffset = 10;
  const barOffset = 3;
  const xAxisTickFormat = d3.timeFormat('%b-%Y');
  const tooltipFormat = d3.format(',');
  let xScale;
  let yScale;
  let binnedData;

  const DateHistogram = ({migrants, width, height, setBrushExtent, xValue}) => {
    const brushRef = ipi.useRef();

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xAxisLabel = 'Reported Date';

    const yValue = d => d['Total Dead and Missing'];
    const yAxisLabel = 'Total Dead and Missing';

    if (!xScale) {
      xScale = d3.scaleTime()
        .domain(d3.extent(migrants, xValue))
        .range([0, innerWidth])
        .nice();
    }

    const [start, stop] = xScale.domain();

    if(!binnedData){
      binnedData = d3.bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(d3.timeMonths(start, stop))
        (migrants)
        .map(array => ({
          y: d3.sum(array, yValue),
          x0: array.x0,
          x1: array.x1
        }));
    }

    if(!yScale){
      yScale = d3.scaleLinear()
        .domain([0, d3.max(binnedData, d => d.y)])
        .range([innerHeight, 0]);
    }

    const brush = d3.brushX()
      .extent([[margin.left, 0], [innerWidth + margin.left, innerHeight]]);
    brush(d3.select(brushRef.current));
    brush.on('brush end', (event, d) => {
      const selection = event.selection && [
        event.selection[0] - margin.left,
        event.selection[1] - margin.left
      ];
      setBrushExtent({
        obj: 'brushExtent',
        state: selection && selection.map(xScale.invert)
      });
    });

    return (
      React.createElement('g', null, [
        React.createElement('rect', {width: width, height: height, className: "bgWhite"}),
        React.createElement('g', {transform: `translate(${margin.left}, ${margin.top})`, className: "multi"}, [
          AxisBottom({
            xScale: xScale, innerHeight: innerHeight,
            tickFormat: xAxisTickFormat,
            tickOffset: tickOffset}
          ),
          AxisLeft({
            yScale: yScale,
            innerWidth: innerWidth,
            tickOffset: tickOffset}
          ),
          React.createElement('text', {
            x: innerWidth / 2,
            y: innerHeight + xAxisLabelOffset,
            textAnchor: "middle",
            className: "axis-label-multi"
          }, [
            xAxisLabel
          ]),
          React.createElement('text', {
            textAnchor: "middle",
            className: "axis-label-multi",
            transform:
              `translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`

          }, [
            yAxisLabel
          ]),
          Marks({
            binnedData: binnedData,
            xScale: xScale,
            yScale: yScale,
            tooltipFormat: tooltipFormat,
            innerHeight: innerHeight,
            barOffset: barOffset}
          )
          ]),
          React.createElement('g', {ref: brushRef, id: "brushRef"})
        ])
    )
  };

  let worldAtlas;
  let migrants;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 30;
  const dateHistogramSize = 0.2;
  const xValue = d => d['Reported Date'];

  const App = () => {
    worldAtlas = worldAtlas ? worldAtlas : useData();
    migrants = migrants ? migrants : useMigrantData();

    if(!worldAtlas || !migrants) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    const [brushExtent, setBrushExtent] = ipi.useState({obj: 'brushExtent', state: null});

    const filteredData = brushExtent ? migrants.filter(d => {
      const date = xValue(d);
      return date > brushExtent[0] && date < brushExtent[1];
    }) : migrants;

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        BubbleMap({
          migrants: migrants,
          filteredData: filteredData,
          worldAtlas: worldAtlas}
        ),
        React__default["default"].createElement('g', {transform: `translate(0, ${height - dateHistogramSize * height})`}, [
          DateHistogram({
          migrants: migrants,
          width: width,
          height: dateHistogramSize * height,
          setBrushExtent: setBrushExtent,
          xValue: xValue}
          )
        ])
      ])
    )
  };

  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'Migrant Deaths/Missing - Multiple Views with Brushing';
  ReactDOM__default["default"].render(App(), rootElement);

})(React, ReactDOM, d3, topojson, ipi);
