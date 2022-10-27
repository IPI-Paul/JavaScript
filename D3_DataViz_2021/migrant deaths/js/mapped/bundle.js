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

  const Marks = ({
    worldAtlas: {land, interiors },
    migrants,
    sizeScale,
    sizeValue
  }) => (
    React.createElement('g', {className: "marks"}, [
      React.createElement('path', {className: "pSphere", d: path({ type: 'Sphere' })}),
      React.createElement('path', {className: "pGraticules", d: path(graticule())}),

        land.features.map(feature => (
          React.createElement('path', {className: "pLand", d: path(feature)})
        )),

      React.createElement('path', {className: "pInteriors", d: path(interiors)}),
      migrants.map(d => {
        const [x, y] = projection(d.coords);
        return React.createElement('circle', {cx: x, cy: y, r: sizeScale(sizeValue(d))})
      })
    ])
  );

  let worldAtlas;
  let migrants;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;

  const App = () => {
    worldAtlas = worldAtlas ? worldAtlas : useData();
    migrants = migrants ? migrants : useMigrantData();

    if(!worldAtlas || !migrants) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    const sizeValue = d => d['Total Dead and Missing'];
    const maxRadius = 15;

    const sizeScale = d3.scaleSqrt()
      .domain([0, d3.max(migrants, sizeValue)])
      .range([0, maxRadius]);

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
        Marks({
          worldAtlas: worldAtlas,
          migrants: migrants,
          sizeScale: sizeScale,
          sizeValue: sizeValue}
        )
      ])
    )
  };
  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'Migrant Deaths/Missing - Mapped';
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, d3, topojson, ipi);
