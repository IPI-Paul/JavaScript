(async () => {
  const { 
    select, csv, scaleLinear, scalePoint, extent, axisLeft, axisBottom, format 
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
          text: d.toProperCase(),
          type: ['year', 'origin', 'name'].includes(d) 
            ? 'categorical' 
            : 'quantitative'
        })
      );
      return [obj.find(d => d.value === items[0]), obj.find(d => d.value === items[1])]
    };


    const [xType, yType] = columns(['horsepower', 'weight']);
    const xValue = d => d[xType.value];
    const xAxisLabel = xType.text;
    const yValue = d => d[yType.value];
    const yAxisLabel = yType.text;
    const circleRadius = 10;
    const chartTitle = `Cars: ${xAxisLabel} vs ${yAxisLabel}`;

    const xScale = (xType.type === 'categorical' 
      ? scalePoint()
        .domain(data.map(xValue))
        .padding(0.2)
      : scaleLinear()
        .domain(extent(data, xValue))        
        .nice()
    ).range([0, size.width]);

    const yScale = (yType.type === 'categorical' 
    ? scalePoint()
        .domain(data.map(yValue))
        .padding(0.2)
    : scaleLinear()
      .domain(extent(data, yValue))      
      .nice()
    ).range([size.height, 0]);
  
    const g = svg
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'bar-chart');

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

    g.selectAll('circle')
      .data(data)
        .enter()
      .append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
    
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
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year + 1900;
    d.origin = d.origin == 1 
      ? 'USA'
      : d.origin == 2
        ? 'Germany'
        : 'Japan';
  }
  if(scriptPath().startsWith('http')) {
    const csvUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'csv',
      'auto.csv'
    ];

    csv(csvUrl.join('/'))
      .then(data => {
        data.forEach(formatData);
        render(data);
      });
  } else {
    await loadData(srcDataJs, ['auto-mpg']);
    auto_mpg
      .forEach(formatData);
      auto_mpg.columns = Object.keys(auto_mpg[0]);
    render(auto_mpg);
  }
})();