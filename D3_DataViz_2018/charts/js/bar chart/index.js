(async () => {
  const { select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom } = d3;

  const width = innerWidth < 1150 ? innerWidth : 1150;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;
    const margin = {top: 20, right: 50, bottom: 25, left: 120};
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
    
   g.append('g').call(axisLeft(yScale));
   g.append('g').call(axisBottom(xScale))
      .attr('transform', `translate(0, ${size.height})`);

    g.selectAll('rect')
      .data(data)
        .enter()
      .append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth() - 2);
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