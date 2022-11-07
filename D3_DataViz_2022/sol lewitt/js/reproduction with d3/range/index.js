App = () => {
  const { select, range } = d3;

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

  for (let prop of [
    {id: 'circle-mask', rect: 'black', circle: 'white', axis: 'y', width: width, 
      height: 10, n: parseInt(height / m)
    }, 
    {id: 'circle-mask-2', rect: 'white', circle: 'black', axis: 'x', width: 10, 
      height: height, n: parseInt(width / m)
    }
  ]) {
    svg
      .append('g')
      .selectAll('rect')
      .data(range(prop.n))
      .join('rect')
      .attr(prop.axis, (d) => d * m)
      .attr('width', prop.width)
      .attr('height', prop.height)
      .attr('mask', `url(#${prop.id})`)
      .attr('fill', 'black');

    const mask = svg.append('mask').attr('id', prop.id);
    mask.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', prop.rect);

    mask.append('circle')
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', height / 2)
      .attr('fill', prop.circle);
  }
}

App();