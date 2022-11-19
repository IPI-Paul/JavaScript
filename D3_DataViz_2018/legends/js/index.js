(async () => {
  await loadScripts(scriptPath(), ['colorLegend', 'sizeLegend']);

  const { select, scaleOrdinal, scaleSqrt } = d3;

  const defaults = {width: 1150, height: 350};
  const client = {width: document.body.clientWidth, height: document.body.clientHeight};
  const width = client.width < defaults.width ? client.width : defaults.width;
  const height = (client.height < defaults.height ? client.height : defaults.height) - topMargin;
  
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
    left: 600,
    x: 180,
    y: 70,
    radius: 30
  };

  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`);

  const colorScale = scaleOrdinal()
    .domain(['apple', 'lemon', 'lime', 'organge'])
    .range(['#c11d1d', '#e8e55a', 'green', 'orange']); 

  svg
    .append('g')
      .attr('transform', `translate(${widthRatio(margin.left)}, ${height / 10})`)
      .call(
        colorLegend, 
        { 
          colorScale, 
          circleRadius: heightRatio(size.radius), 
          spacing: heightRatio(size.y),
          textOffset: heightRatio(size.y - (size.radius * 0.6)) 
        }
      ); 

  const sizeScale = scaleSqrt()
    .domain([0, 10])
    .range([0, 50]);
    
  svg
    .append('g')
      .attr('transform', `translate(${widthRatio(size.left)}, ${height / 5})`)
      .call(
        sizeLegend, 
        { 
          sizeScale, 
          spacing: heightRatio(size.y - 20),
          textOffset: heightRatio(size.y),
          numTicks: 5, 
          circleFill: 'rgba(0, 0, 0, 0.5)'           
        }
      ); 
})();