scatterPlot = () => {
  const { scaleLinear, extent, axisLeft, axisBottom } = d3;
  let width, height, data, xValue, yValue, legend, colorValue, margin, radius;

  const my = (selection) => {  
    const x = scaleLinear()
      .domain(extent(data, xValue)) // does both min and max
      .range([margin.left, width - margin.right]);
  
    const y = scaleLinear()
    .domain(extent(data, yValue)) // does both min and max
    .range([height - margin.bottom, margin.top]);
    
    const marks = data.map(d => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      title: `${legend(d)} \nX: ${xValue(d)} \nY: ${yValue(d)}`,
      color: colorValue(d)
    }));

    selection
      .selectAll('circle')
      .data(marks)
      .join('circle')
      .attr('r', radius)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => d.color)
      .append('title')
      .text(d => d.title);
    
    selection
      .selectAll('g.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(y));
    
    selection
      .selectAll('g.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));
  }; 

  for (let func of [
    'width', 'height', 'data', 'xValue', 'yValue', 'legend', 'colorValue', 
    'margin', 'radius'
  ]) {
    eval(`my.${func} = function (_) {
        return arguments.length ? (
          ${func} = func in ['width', 'height', 'radius'] ? +_ : _, my
        ) : ${func}
      }
    `);  
  }

  return my;
};