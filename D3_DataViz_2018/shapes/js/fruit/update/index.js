(async () => {
  const { select, range, scaleOrdinal } = d3;

  const width = innerWidth < 960 ? innerWidth : 960;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;
  const colorScale = scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range(['#c11d1d', '#e8e55a']);
  
  const radiusScale = scaleOrdinal()
    .domain(['apple', 'lemon'])
    .range([50, 30]);
  
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
        .attr('fill', d => colorScale(d.type))
        .attr('r', d => radiusScale(d.type));

    circles
      .attr('fill', d => colorScale(d.type))
      .attr('r', d => radiusScale(d.type));
      
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

  // Replacing an apple with a lemon
  setTimeout(() => {
    fruits[2].type = 'lemon';  
    render(svg, { fruits });    
  }, 1000);
})();