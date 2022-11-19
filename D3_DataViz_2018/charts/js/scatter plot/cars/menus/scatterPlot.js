(() => {
  const scatterPlot = (selection, props) => {
    const { 
      scaleLinear, scalePoint, extent, axisLeft, axisBottom
    } = d3;
    const { 
      title, xValue, xAxisLabel, yValue, yAxisLabel, circleRadius, xType, yType, 
      margin, data, inner
    } = props;

    const xScale = (xType.type === 'categorical' 
      ? scalePoint()
        .domain(data.map(xValue))
        .padding(0.2)
      : scaleLinear()
        .domain(extent(data, xValue))        
        .nice()
    ).range([0, inner.width]);

    const yScale = (yType.type === 'categorical' 
    ? scalePoint()
        .domain(data.map(yValue))
        .padding(0.2)
    : scaleLinear()
      .domain(extent(data, yValue))      
      .nice()
    ).range([inner.height, 0]);
  
    const g = selection
      .selectAll('.bar-chart')
      .data([null]);

    const gEnter = g.enter()
      .append('g')
        .attr('class', 'bar-chart');

    gEnter
      .merge(g)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
        // .attr('class', 'bar-chart');

    const xAxis = axisBottom(xScale)
      .tickSize(-inner.height)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
    .tickSize(-inner.width)
    .tickPadding(10);

    const yAxisG = g.select('.y-axis');
    const yAxisGEnter = gEnter
      .append('g')
        .attr('class', 'y-axis');

    yAxisG  
      .merge(yAxisGEnter)
        .call(yAxis)
      .selectAll('.domain')
        .remove();

    const yAxisLabelText = yAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -inner.left)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .merge(yAxisG.select('.axis-label'))
        .attr('x', -inner.height / 2)
        .text(yAxisLabel);

    const xAxisG = g.select('.x-axis');
    const xAxisGEnter = gEnter
      .append('g')
        .attr('class', 'x-axis');

    xAxisG  
      .merge(xAxisGEnter)
        .attr('transform', `translate(0, ${inner.height})`)
        .call(xAxis)
      .selectAll('.domain')
        .remove();

    const xAxisLabelText = xAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', inner.bottom)
        .attr('fill', 'black')
      .merge(xAxisG.select('.axis-label'))
        .attr('x', inner.width / 2)
        .text(xAxisLabel);

    const circles = g.merge(gEnter).selectAll('circle').data(data);

    circles
      .enter()
      .append('circle')
        .attr('cx', inner.width / 2)
        .attr('cy', inner.height / 2)
        .attr('r', 0)
      .merge(circles)
      .transition()
        .duration(2000)
      .delay((d, i) => i * 10)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
    
    // const chartTitle = g.select('.title');
    // const chartTitleEnter = gEnter
    //   .append('text')
    //     .attr('y', -inner.top)
    //     .attr('x', inner.width / 2)
    //     .attr('class', 'title');
    
    // chartTitle
    //   .merge(chartTitleEnter)
    //     .text(title);
  };

  globalThis.scatterPlot = scatterPlot;
})();