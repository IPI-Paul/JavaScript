(async () => {
  await loadScripts(scriptPath(), ['fruitBowl']);

  const { select, range } = d3;

  const defaults = {width: 1150, height: 350}
  const width = innerWidth < defaults.width ? innerWidth : defaults.width;
  const height = (innerHeight < defaults.height ? innerHeight : defaults.height) - topMargin;
  
  const widthRatio = (input) => (
    height < defaults.height - topMargin 
      ? ((input / innerWidth) * width) - ((input * .3) * (width / defaults.width))
      : input
  );

  const heightRatio = (input) => (
    height < defaults.height - topMargin
      ? (input / (defaults.height - topMargin)) * height
      : (input / height) * (defaults.height - topMargin)
  );

  const margin = {top: 70, right: 100, bottom: 25, left: 110};
  const size = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 20,
    right: 70,
    bottom: 60,
    left: 70,
    x: 180,
    radius: 50
  };

  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`);
  
  const makeFruit = type => ({ type });
  let fruits = range(5)
    .map(() => makeFruit('apple'));

  const render = () => {
    fruitBowl(svg, { fruits, height, heightRatio, widthRatio, margin, size });
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
  }, 1000);

  // Eat another apple
  setTimeout(() => {
    fruits = fruits.filter((d, i) => i !== 1);  
    render(svg, { fruits });    
  }, 3000);
})();