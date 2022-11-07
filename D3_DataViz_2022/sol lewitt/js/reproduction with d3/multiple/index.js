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

    // const g = mask
    //   .append('g')
    //   .attr('transform', `translate(${width / 2}, ${height / 2})`);
    mask.selectAll('g')
      .data(range(symbols.length))
      .join(enter => 
        enter
          .append('g')
          .attr('transform', (d) => 
          `translate(${d * parseInt(width / symbols.length) + 
            ((width / symbols.length) / 2.5)}, ${height / 2})`)
          .append('path')
          .attr('d', (d) => symbol(symbols[d], 12000)())
          .attr('fill', inverted ? 'white' : 'black')
        );
  }

  for (let prop of [
    {id: 'mask-1', axis: 'y', width: width, height: 10, n: parseInt(height / m), 
      inverted: true
    }, 
    {id: 'mask-2', axis: 'x', width: 10, height: height, n: parseInt(width / m), 
      inverted: false
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