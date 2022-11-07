App = () => {
  const { select, range, symbols, symbol } = d3;

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

  const renderMask = (id, inverted) => {
    const mask = svg.append('mask').attr('id', id);
    mask.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', inverted ? 'black' : 'white');

    mask
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .append('path')
      .attr('d', symbol(symbols[0], 45000))
      .attr('fill', inverted ? 'white' : 'black');
  }

  for (let prop of [
    {id: 'mask-1', rect: 'black', circle: 'white', axis: 'y', width: width, 
      height: 10, n: parseInt(height / m), inverted: true
    }, 
    {id: 'mask-2', rect: 'white', circle: 'black', axis: 'x', width: 10, 
      height: height, n: parseInt(width / m), inverted: false
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
    renderMask(prop.id, prop.inverted)
  }
}

App();