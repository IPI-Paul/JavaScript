(async () => {
  const { select, range } = d3;

  const width = innerWidth < 960 ? innerWidth : 960;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;
  
  const widthRatio = (input) => (
    height < 500 - topMargin 
      ? ((input / innerWidth) * width) - ((input * 0.3) * (width / 960))
      : input
  );

  const heightRatio = (input) => (
    height < 500 - topMargin
      ? (input / (500 - topMargin)) * height
      : (input / height) * (500 - topMargin)
  );

  const radius = heightRatio(50);

  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', '0 0 960 500');

  const render = (selection, { fruits }) => {
    const circles = selection
      .selectAll('circle')
      .data(fruits);

    circles
      .enter()
      .append('circle')
        .attr('cx', (d, i) => i * 120 + 60)
        .attr('cy', height / 2)
        .attr('fill', '#c11d1d')
        .attr('r', radius);

    circles.exit().remove();
  };
  
  const makeFruit = type => ({ type });
  const fruits = range(5)
    .map(() => makeFruit('apple'));

  render(svg, { fruits });

  // Eat an apple
  setTimeout(() => {
    fruits.pop();  
    render(svg, { fruits });    
  }, 1000);
})();