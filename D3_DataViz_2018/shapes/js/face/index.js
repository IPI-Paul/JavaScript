(async () => {
  const { select, arc } = d3;

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

  const eyeSpacing = widthRatio(100);
  const eyeYOffset = heightRatio(-70);
  const eyeRadius = heightRatio(30);
  const eyebrowWidth = heightRatio(70);
  const eyebrowHeight = heightRatio(15);
  const eyebrowYOffset = heightRatio(-70);

  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', '0 0 960 500');
  
  const g = svg
    .append('g')
    .attr('transform', `translate(${width / 2}, ${(height / 2)})`);
  
  const circle = g
    .append('circle')
    .attr('r', height / 2)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

  const eyesG = g
    .append('g')
    .attr('transform', `translate(0, ${eyeYOffset})`);
  
  const leftEye = eyesG
    .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', -eyeSpacing);
  
  const righttEye = eyesG
    .append('circle')
    .attr('r', eyeRadius)
    .attr('cx', eyeSpacing);

  const leftEyebrow = eyesG
    .append('rect')
    .attr('x', -eyeSpacing - eyebrowWidth / 2)
    .attr('y', eyebrowYOffset)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

  const rightEyebrow = eyesG
    .append('rect')
    .attr('x', eyeSpacing - eyebrowWidth / 2)
    .attr('y', eyebrowYOffset)
    .attr('width', eyebrowWidth)
    .attr('height', eyebrowHeight);

  const mouth = g
    .append('path')
    .attr('d', arc()({
      innerRadius: heightRatio(150),
      outerRadius: heightRatio(170),
      startAngle: Math.PI / 2,
      endAngle: Math.PI * 3 /2
    }));
})();