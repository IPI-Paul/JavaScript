(() => {
  const { select } = d3;

  const svg = select('#root')
    .append('svg');

  const width = document.body.clientWidth;
  const height = document.body.clientHeight - topMargin;

  svg
    .attr('width', width)
    .attr('height', height)
    .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('rx', 40);
})()