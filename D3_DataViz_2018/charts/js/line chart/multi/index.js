(async () => {
  await loadScripts(scriptPath(), ['colorLegend'])
  const { 
    select, csv, scaleLinear, scaleOrdinal, scaleTime, extent, axisLeft, axisBottom, 
    line, curveBasis, group, schemeCategory10, descending
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

  const margin = {top: 40, right: 165, bottom: 60, left: 110};
  const inner = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 10,
    right: 145,
    bottom: 60,
    left: 50,
    x: 30,
    y: 25,
    radius: 10
  };

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
    const chartTitle = `A Week of Temperature Around the World`;
    const colorValue = d => d.city;

    const xScale = (xType.type === 'ordinal' 
      ? scaleTime()
      : scaleLinear()
    )
      .domain(extent(data, xValue))  
      .range([0, inner.width])      
      .nice();

    const yScale = (yType.type === 'ordinal' 
      ? scaleTime()
      : scaleLinear()  
    )
      .domain(extent(data, yValue))
      .range([inner.height, 0])    
      .nice();

    const colorScale = scaleOrdinal(schemeCategory10);
  
    const g = svg
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'line-chart');

    const xAxis = axisBottom(xScale)
      .tickSize(-inner.height)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
    .tickSize(-inner.width)
    .tickPadding(10);

    const yAxisG = g.append('g')
    .call(yAxis);

    yAxisG
      .selectAll('.domain')
        .remove();

    yAxisG
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -inner.left)
        .attr('x', -inner.height / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g.append('g')
      .call(xAxis)
        .attr('transform', `translate(0, ${inner.height})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', inner.bottom)
      .attr('x', inner.width / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);

    const lastYValue = d => yValue(d.values[d.values.length - 1]);

    const nested = Array.from(
        group(data, colorValue), 
        ([key, values]) => ({key, values})
      )
      .sort((a, b) => 
        descending(lastYValue(a), lastYValue(b))
      );

    colorScale.domain(nested.map(d => d.key));
    
    g
      .selectAll('.multi-line-path')
      .data(nested)
      .enter()
      .append('path')
        .attr('class', 'multi-line-path')
        .attr('d', d => lineGenerator(d.values))
        .attr('stroke', d => colorScale(d.key));
    
    g.append('text')
      .attr('class', 'title')
      .attr('y', -inner.top)
      .attr('x', inner.width / 2)
      .text(chartTitle);

    svg
      .append('g')
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
      'data_canvas_sense_your_city_one_week.csv'
    ];

    csv(csvUrl.join('/'))
      .then(data => {
        data.forEach(formatData);
        render(data);
      });
  } else {
    await loadData(srcDataJs, ['data_canvas_sense_your_city_one_week']);
    temperatureMulti.forEach(formatData);
    temperatureMulti.columns = Object.keys(temperatureMulti[0]);
    render(temperatureMulti);
  }
})();