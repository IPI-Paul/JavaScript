App = () => {
  const { select, range } = d3;

  const width = innerWidth;
  const height = innerHeight - topMargin;
  const xGrowth = (y) => (width / y);
  const yGrowth = (y) => (height / y);

  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${width} ${height}`)
    .attr('xlmns', 'http://www.w3.org/2000/svg');

  let t = 0;
  const interval = setInterval(() => {
    const n = 10 + Math.sin(t) * 5;
    const data = range(n).map(d => ({
      r: 20 + Math.sin(d * 0.5 + t * 2) * 10,
      x: d * xGrowth(n) + 50,
      y: yGrowth(2.1) + Math.sin(d * 0.5 + t) * yGrowth(2.5)
    }));
    
    const circles = svg.selectAll('circle').data(data);
    const circlesEnter = circles.enter().append('circle').attr('r', 20);
    circles
      .merge(circlesEnter)
      .attr('r', (d) => d.r)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);
    circles.exit().remove();
    
    /* Shorthand way using .join. But, attr('r', 20) is duplicated in operation
    const circles = 
      svg
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 20)
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    */

    t = t + 0.01;
    if(t >= 10) {
      clearInterval(interval);
    }
  }, 1000 / 60); // 1000 / 60 = 60 fps (frames per second)
}
App();