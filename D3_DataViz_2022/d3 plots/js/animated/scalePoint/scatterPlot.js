scatterPlot = () => {
  const { 
    scaleLinear, extent, axisLeft, axisBottom , transition, easeLinear, 
    format, scalePoint
  } = d3;
  let width, height, data, xValue, yValue, legend, colorValue, margin, radius;
  let interval, xAxisTitle, yAxisTitle, xType, yType, leftMargin;

  const my = (selection) => {  
    leftMargin = margin.left + (yType === 'categorical' ? 40 : 0);
    const x = (xType === 'categorical' 
        ? scalePoint()
          .domain(data.map(xValue))
          .padding(0.2)
        : scaleLinear()
          .domain(extent(data, xValue)) // does both min and max
          .nice()
      ).range([leftMargin, width - margin.right]);
    
    const y = (yType === 'categorical' 
      ? scalePoint()
          .domain(data.map(yValue))
          .padding(0.2)
      : scaleLinear()
          .domain(extent(data, yValue)) // does both min and max
          .nice()
      ).range([height - margin.bottom - 20, margin.top]);
    
    const marks = data.map(d => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      title: `
${legend(d)}
  X: ${isNaN(d) ? xValue(d) : format('.1f')(xValue(d))}
  Y: ${isNaN(d) ? yValue(d) : format('.1f')(yValue(d))}
      `,
      color: colorValue(d)
    }));

    const t = 
      transition()
        .duration((interval - 10) / 1.5)
        .ease(easeLinear);

    const positionCircles = (circles) => (
      circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    );

    const summary = () => summarizePlot('species', data, xAxisTitle, yAxisTitle);

    selection
      .selectAll('a.x-axis-label')
      .data([null])
      .join(
          enter => 
            enter 
              .append('a')
              .attr('class', 'x-axis-label')
              .attr('transform', `
                translate(${width / 2}, ${height - margin.x_axis})
              `)
              .on('click', event => summary())
              .append('text')
              .text(xAxisTitle),
          update => 
            update
              .on('click', event => summary())
              .select('text')
              .text(xAxisTitle),
          exit => exit.remove()
    );

    selection
      .selectAll('text.y-axis-label')
      .data([null])
      .join(
          enter => 
            enter 
              .append('text')
              .attr('class', 'y-axis-label')
              .attr('transform', `
                translate(${margin.y_axis}, ${height / 2 + margin.top}), 
                rotate(-90)
              `)
              .text(yAxisTitle),
          update => 
            update
              .text(yAxisTitle),
          exit => exit.remove()
      );

    selection
      .selectAll('circle')
      .data(marks)
      .join(
        enter => 
          enter
            .append('circle')
            .attr('r', 0)
            .call(enter => 
              enter.transition(t).attr('r', radius)
            )
            .call(positionCircles)
            .attr('fill', d => d.color)
            .append('title')
            .text(d => d.title),
        update => 
          update
            .call(update => 
              update
              .transition(t)
              .delay((d, i) => i * 10)
              .call(positionCircles)
            )
            .select('title')
            .text(d => d.title),
        exit => exit.remove()
      );
    
    selection
      .selectAll('g.y-axis')
      .data([null])
      .join('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${leftMargin}, 0)`)
      .call(axisLeft(y));
    
    selection
      .selectAll('g.x-axis')
      .data([null])
      .join('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom - 20})`)
      .transition(t)
      .call(axisBottom(x));
  }; 

  for (let func of [
    'width', 'height', 'data', 'xValue', 'yValue', 'legend', 'colorValue', 
    'margin', 'radius', 'interval', 'xAxisTitle', 'yAxisTitle', , 'xType', 'yType'
  ]) {
    eval(`my.${func} = function (_) {
        return arguments.length ? (
          ${func} = func in ['width', 'height', 'radius', 'interval'] ? +_ : _, my
        ) : ${func}
      }
    `);  
  }

  // my.on = function () {
  //   console.log('here');
  //   let value = listners.on.apply(listners, arguments);
  //   return value === listners ? my : value;
  // }

  return my;
};