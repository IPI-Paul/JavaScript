(() => {
  const lineChart = (selection, props) => {
    const { 
      colorScale, xType, yType, xValue, yValue, xAxisLabel, yAxisLabel, 
      chartTitle, margin, inner, data, nested, selectedYear, setSelectedYear      
    } = props;
    const { 
      scaleLinear, scaleTime, extent, axisLeft, axisBottom, 
      line, curveBasis, format, pointer
    } = d3;
    
    const yAxisTickFormat = number => 
      format(',.2s')(number)
        .replace('G', 'B')
        .replace('.0', '');

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
  
    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter()
      .append('g')
      .attr('class', 'container');
    
    gEnter
      .merge(g)
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xAxis = axisBottom(xScale)
      .tickSize(-inner.height)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
    .tickSize(-inner.width)
    .tickFormat(yAxisTickFormat)
    .tickPadding(10);

    const yAxisGEnter = gEnter
      .append('g')
        .attr('class', 'y-axis');

    const yAxisG = g.select('.y-axis');

    yAxisGEnter
      .merge(yAxisG)
        .call(yAxis)
        .selectAll('.domain')
          .remove();

    yAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -inner.left)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .merge(yAxisG.select('.axis-label'))
        .attr('x', -inner.height / 2)
        .text(yAxisLabel);

    const xAxisGEnter = gEnter
      .append('g')
        .attr('class', 'x-axis');

    const xAxisG = g.select('.x-axis');

    xAxisGEnter
      .merge(xAxisG)
        .call(xAxis)
        .attr('transform', `translate(0, ${inner.height})`)
        .select('.domain').remove();

    xAxisGEnter
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', inner.bottom)
        .attr('fill', 'black')
      .merge(xAxisG.select('.axis-label'))
        .attr('x', inner.width / 2)
        .text(xAxisLabel);

    const lineGenerator = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)))
      .curve(curveBasis);
    
    const linePaths = g.merge(gEnter)
      .selectAll('.melt-line-path')
      .data(nested);

    linePaths
      .enter()
      .append('path')
        .attr('class', 'melt-line-path')
      .merge(linePaths)
        .attr('d', d => lineGenerator(d.values))
        .attr('stroke', d => colorScale(d.key));
    
    const selectedYearDate = parseYear(selectedYear);
    gEnter
      .append('line')
        .attr('class', 'selected-year-line')
        .attr('y1', 0)
      .merge(g.select('.selected-year-line'))
        .attr('x1', xScale(selectedYearDate))
        .attr('x2', xScale(selectedYearDate))
        .attr('y2', inner.height);

    gEnter
      .append('text')
        .attr('class', 'title')
        .attr('y', -inner.top)
        .attr('x', inner.width / 2)
      .merge(g.select('.title'))
        .text(chartTitle);

    gEnter
      .append('rect')
        .attr('class', 'mouse-interceptor')
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
      .merge(g.select('.mouse-interceptor'))
        .attr('width', inner.width)
        .attr('height', inner.height)
        .on('mousedown', () => lineSelected = true)
        .on('mouseup', () => lineSelected = false)
        .on('mousemove', () => {
          if(lineSelected) {
            const x = pointer(event)[0];
            const hoveredDate = xScale.invert(x);
            setSelectedYear(hoveredDate.getFullYear());
          }
        });
  };

  globalThis.lineChart = lineChart;
})();