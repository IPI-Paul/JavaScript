(async () => {
  const { 
    select, csv, scaleLinear, scaleTime, extent, axisLeft, axisBottom, line, 
    curveBasis 
  } = d3;

  const width = innerWidth < 1150 ? innerWidth : 1150;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;
  const margin = {top: 50, right: 50, bottom: 70, left: 100};
  const size = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 20,
    left: 70,
    bottom: 60
  }

  const render = data => {
    const columns = (items) => {
      const obj = data.columns.map(d => 
        ({
          value: d,
          text: d.toProperCase().replace('stamp', ''),
          type: ['timestamp'].includes(d) 
            ? 'ordinal' 
            : 'quantitative'
        })
      );
      return [obj.find(d => d.value === items[0]), obj.find(d => d.value === items[1])]
    };

    const [xType, yType] = columns(['timestamp', 'temperature']);
    const xValue = d => d[xType.value];
    const xAxisLabel = xType.text;
    const yValue = d => d[yType.value];
    const yAxisLabel = yType.text;
    const circleRadius = 4;
    const chartTitle = `A Week in San Francisco`;

    const xScale = (xType.type === 'ordinal' 
      ? scaleTime()
      : scaleLinear()
    )
      .domain(extent(data, xValue))  
      .range([0, size.width])      
      .nice();

    const yScale = (yType.type === 'ordinal' 
      ? scaleTime()
      : scaleLinear()  
    )
      .domain(extent(data, yValue))
      .range([size.height, 0])    
      .nice();
  
    const g = svg
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'line-chart');

    const xAxis = axisBottom(xScale)
      .tickSize(-size.height)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
    .tickSize(-size.width)
    .tickPadding(10);

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

    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);

    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator(data));
    
    g.append('text')
      .attr('class', 'title')
      .attr('y', -size.top)
      .attr('x', size.width / 2)
      .text(chartTitle);
  };
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', '0 0 1150 500');  
      
  const formatData = d => {
    d.temperature = +d.temperature;
    d.timestamp = new Date(d.timestamp);
  };

  if(scriptPath().startsWith('http')) {
    const csvUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'csv',
      'week_temperature_sf.csv'
    ];

    csv(csvUrl.join('/'))
      .then(data => {
        data.forEach(formatData);
        render(data);
      });
  } else {
    await loadData(srcDataJs, ['temperature-in-san-francisco']);
    temperature
      .forEach(formatData);
      temperature.columns = Object.keys(temperature[0]);
    render(temperature);
  }
})();