scatterPlot = () => {
  const { 
    scaleLinear, extent, axisLeft, axisBottom, symbols, symbol, scaleOrdinal 
  } = d3;
  let width, height, data, xValue, yValue, legend, colorValue, margin, size;
  let symbolValue;

  const my = (selection) => {  
    const x = scaleLinear()
      .domain(extent(data, xValue)) // does both min and max
      .range([margin.left, width - margin.right]);
  
    const y = scaleLinear()
    .domain(extent(data, yValue)) // does both min and max
    .range([height - margin.bottom, margin.top]);

    const symbolScale = 
      scaleOrdinal()
        .domain(data.map(symbolValue))
        .range(symbols);
    
    const symbolGenerator = new symbol().size(size);
    
    const marks = data.map(d => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      title: `${legend(d)} \nX: ${xValue(d)} \nY: ${yValue(d)}`,
      color: colorValue(d),
      pathD: symbolGenerator.type(symbolScale(symbolValue(d)))()
    }));

    selection
      .selectAll('path')
      .data(marks)
      .join('path')
      .attr('d', d => d.pathD)
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('fill', d => d.color)
      .append('title')
      .text(d => d.title);
    
    selection
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(y));
    
    selection
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));
  }; 

  for (let func of [
    'width', 'height', 'data', 'xValue', 'yValue', 'legend', 'colorValue', 
    'margin', 'size', 'symbolValue'
  ]) {
    eval(`my.${func} = function (_) {
        return arguments.length ? (
          ${func} = func in ['width', 'height', 'size'] ? +_ : _, my
        ) : ${func}
      }
    `);  
  }

  return my;
};