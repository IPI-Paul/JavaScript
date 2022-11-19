(async () => {
  const { 
    select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format 
  } = d3;

  const width = innerWidth < 1150 ? innerWidth : 1150;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;
    const margin = {top: 40, right: 50, bottom: 60, left: 130};
    const size = {
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom
    }

  const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, size.width]);

    const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, size.height]);
  
    const g = svg
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'bar-chart');
    
    const xAxisTickFormat = number => 
      format('.3s')(number)
        .replace('G', 'B');

    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-size.height);

    g.append('g')
    .call(axisLeft(yScale))
    .selectAll('.domain, .tick line')
      .remove();

    const xAxisG = g.append('g')
      .call(xAxis)
        .attr('transform', `translate(0, ${size.height})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', 50)
      .attr('x', size.width / 2)
      .attr('fill', 'black')
      .text('Population');

    g.selectAll('rect')
      .data(data)
        .enter()
      .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth() - 2);
    
    g.append('text')
      .attr('class', 'title')
      .attr('y', -10)
      .attr('x', size.width / 2)
      .text('Top 10 most Populous Countries');
  };
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', '0 0 1150 500');  
      
  const formatData = d => d.population = +d.population * 1000;

  if(scriptPath().startsWith('http')) {
    const csvUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'csv',
      'Population Top10.csv'
    ];

    csv(csvUrl.join('/'))
      .then(data => {
        data.forEach(formatData);
        render(data);
      });
  } else {
    await loadData(srcDataJs, ['population-top10']);
    populationTop10.forEach(formatData);
    populationTop10.columns = Object.keys(populationTop10[0]);
    render(populationTop10);
  }
})();