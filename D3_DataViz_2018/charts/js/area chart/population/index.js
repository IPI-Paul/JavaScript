(async () => {
  const { 
    select, csv, scaleLinear, scaleTime, extent, axisLeft, axisBottom, area, 
    curveBasis, max, format 
  } = d3;

  const width = innerWidth < 1150 ? innerWidth : 1150;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;
  const margin = {top: 50, right: 50, bottom: 70, left: 100};
  const size = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 30,
    left: 70,
    bottom: 60
  }

  const render = data => {
    const columns = (items) => {
      const obj = data.columns.map(d => 
        ({
          value: d,
          text: d.toProperCase(),
          type: ['year'].includes(d) 
            ? 'ordinal' 
            : 'quantitative'
        })
      );
      return [obj.find(d => d.value === items[0]), obj.find(d => d.value === items[1])]
    };

    const [xType, yType] = columns(['year', 'population']);
    const xValue = d => d[xType.value];
    const xAxisLabel = xType.text;
    const yValue = d => d[yType.value];
    const yAxisLabel = yType.text;
    const circleRadius = 4;
    const chartTitle = `World Population`;

    const xScale = (xType.type === 'ordinal' 
      ? scaleTime()
        .domain(extent(data, xValue))
      : scaleLinear()
      .domain([0, max(data, xValue)])
    )  
      .range([0, size.width])
      .nice();

    const yScale = (yType.type === 'ordinal' 
      ? scaleTime()
        .domain(extent(data, yValue))
      : scaleLinear()
        .domain([0, max(data, yValue)])  
    )
      .range([size.height, 0])    
      .nice();
  
    const g = svg
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'area-chart');

    const xAxis = axisBottom(xScale)
      .tickSize(-size.height)
      .tickPadding(15);

    const yAxisTickFormat = number => 
      format('.1s')(number)
        .replace('G', 'B')

    const yAxis = axisLeft(yScale)
    .tickSize(-size.width)
    .tickPadding(10)
    .tickFormat(yAxisTickFormat);

    const yAxisG = g.append('g')
    .call(yAxis);

    yAxisG
      .selectAll('.domain')
        .remove();

    yAxisG
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -size.left)
        .attr('x', -size.height / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g.append('g')
      .call(xAxis)
        .attr('transform', `translate(0, ${size.height})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', size.bottom)
      .attr('x', size.width / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    const areaGenerator = area()
      .x(d => xScale(xValue(d)))
      .y0(size.height)
      .y1(d => yScale(yValue(d)))
      .curve(curveBasis);

    g.append('path')
      .attr('class', 'area-path')
      .attr('d', areaGenerator(data));
    
    svg.append('text')
      .attr('class', 'title')
      .attr('y', size.top)
      .attr('x', width / 2)
      .text(chartTitle);
  };
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', '0 0 1150 500');  
      
  const formatData = d => {
    d.population = +d.population;
    d.year = new Date(d.year);
  };

  if(scriptPath().startsWith('http')) {
    const csvUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'csv',
      'worldPopulationByYear.csv'
    ];

    csv(csvUrl.join('/'))
      .then(data => {
        data.forEach(formatData);
        render(data);
      });
  } else {
    await loadData(srcDataJs, ['world-population-by-year-2015']);
    worldPopulation
      .forEach(formatData);
      worldPopulation.columns = Object.keys(worldPopulation[0]);
    render(worldPopulation);
  }
})();