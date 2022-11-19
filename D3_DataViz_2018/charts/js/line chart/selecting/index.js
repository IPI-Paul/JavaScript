(async () => {
  await loadScripts(scriptPath(), [
    'colorLegend', 'loadAndProcessData', 'lineChart'
  ]);
  const { 
    select, scaleLinear, scaleOrdinal, scaleTime, extent, axisLeft, axisBottom, 
    line, curveBasis, group, schemeCategory10, descending, format, pointer
  } = d3;

  const defaults = {width: 1150, height: 500};
  const client = {width: document.body.clientWidth, height: document.body.clientHeight};
  const width = client.width < defaults.width ? client.width : defaults.width;
  const height = (client.height < defaults.height ? client.height : defaults.height) - topMargin;
  
  const widthRatio = (input) => (
    height < defaults.height - topMargin 
      ? ((input / innerWidth) * width) - ((input * .3) * (width / defaults.width))
      : input
  );

  const heightRatio = (input) => (
    height < defaults.height - topMargin
      ? (input / (defaults.height - topMargin)) * height
      : (input / height) * (defaults.height - topMargin)
  );

  const margin = {top: 40, right: 230, bottom: 60, left: 110};
  const inner = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 10,
    right: 210,
    bottom: 60,
    left: 80,
    x: 30,
    y: 25,
    radius: 10
  };

  let selectedYear = 2018;
  let data;
  let lineSelected = false;

  const setSelectedYear = year => {
    selectedYear = year;
    render();
  };

  const render = () => {
    const columns = (items) => {
      const obj = Object.keys(data[0]).map(d => 
        ({
          value: d,
          text: d.toProperCase(),
          type: ['year', 'name'].includes(d) 
            ? 'ordinal' 
            : 'quantitative'
        })
      );
      return items.map(v => obj.find(d => d.value === v));
    };
    const [xType, yType] = columns(['year', 'population']);

    const colorValue = d => d.name;
    const colorScale = scaleOrdinal(schemeCategory10);
    const yValue = d => d[yType.value];
    const lastYValue = d => yValue(d.values[d.values.length - 1]);

    const nested = Array.from(
        group(data, colorValue), 
        ([key, values]) => ({key, values})
      )
      .sort((a, b) => 
        descending(lastYValue(a), lastYValue(b))
      );

    colorScale.domain(nested.map(d => d.key));

    lineChartG
      .call(lineChart, {
        colorScale, 
        colorValue,
        xType, 
        yType,
        xValue: d => d[xType.value],
        xAxisLabel: xType.text,
        yValue, 
        yAxisLabel: yType.text,
        chartTitle: `Population over Time by Region`,
        inner,
        margin,
        width,
        height,
        data,
        nested, 
        selectedYear, 
        setSelectedYear, 
        lineSelected
      });

    colorLegendG
        .attr('transform', `translate(${width - inner.right}, ${heightRatio(height / 3)})`)
        .call(
          colorLegend, 
          { 
            colorScale, 
            circleRadius: heightRatio(inner.radius), 
            spacing: heightRatio(inner.y),
            textOffset: heightRatio(inner.y - (inner.radius * 0.6)) 
          }
        ); 
  };
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`);  

  const lineChartG = svg.append('g');
  const colorLegendG = svg.append('g');

  loadAndProcessData()
    .then((loadedData) => {
      data = loadedData;
      render();
    });
})();