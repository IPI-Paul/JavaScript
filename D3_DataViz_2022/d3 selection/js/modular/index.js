makeData = () => {};
vizData = () => {};
App = () => {
  let ret;
  ret = loadScripts(scriptPath(), ['makeData', 'vizData']);
  if(ret) {
    setTimeout(() => {App();}, 100);
    return console.log('Loading...');
  }
  clearTimeout();
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
    const data = makeData(range, n, t, xGrowth, yGrowth);
    svg.call(vizData, data);
    t = t + 0.01;
    if(t >= 10) {
      clearInterval(interval);
    }
  }, 1000 / 60); // 1000 / 60 = 60 fps (frames per second)
}
App();