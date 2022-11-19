(async () => {
  await loadScripts(scriptPath(), ['fruitBowl']);

  const { select, range } = d3;

  const width = innerWidth < 960 ? innerWidth : 960;
  const height = (innerHeight < 500 ? innerHeight : 500) - topMargin;

  const heightRatio = (input) => (
    height < 500 - topMargin
      ? (input / (500 - topMargin)) * height
      : (input / height) * (500 - topMargin)
  );
  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', '0 0 960 500');
  
  const makeFruit = type => ({ 
    type,
    id: Math.random() 
  });
  let fruits = range(5)
    .map(() => makeFruit('apple'));

  const render = () => {
    fruitBowl(svg, { fruits, height, heightRatio });
  };

  render();

  // Eat an apple
  setTimeout(() => {
    fruits.pop();  
    render(svg, { fruits });    
  }, 1000);

  // Replacing an apple with a lemon
  setTimeout(() => {
    fruits[2].type = 'lemon';  
    render();    
  }, 2000);

  // Eat another apple
  setTimeout(() => {
    fruits = fruits.filter((d, i) => i !== 1);  
    render(svg, { fruits });    
  }, 3000);
})();