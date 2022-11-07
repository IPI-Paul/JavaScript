App = () => {
  const { select } = d3;

  const width = innerWidth;
  const height = innerHeight - topMargin;

  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${width} ${height}`)
    .attr('fill', 'none')
    .attr('xlmns', 'http://www.w3.org/2000/svg');

  const m = 20;
  let n = parseInt(height / m);
  const marks = [];
  for(let i = 0; i < n; i++) {
    marks.push({
      y: i * m,
      width: width,
      height: 10,
      mask: 'url(#circle-mask)',
      fill: 'black'
    });
  }

  svg
    .selectAll('rect')
    .data(marks)
    .join('rect')
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .attr('mask', (d) => d.mask)
    .attr('fill', (d) => d.fill);
}

App();