(() => {
  const fruitBowl = (selection, props) => {
    const { scaleOrdinal } = d3;
    const { fruits, height, heightRatio } = props;

    const colorScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range(['#c11d1d', '#e8e55a']);
    
    const radiusScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range([heightRatio(50), heightRatio(30)]);
      
    const circles = selection
      .selectAll('circle')
      .data(fruits);

    circles
      .enter()
      .append('circle')
        .attr('cx', (d, i) => i * heightRatio(180) + heightRatio(100))
        .attr('cy', height / 2)
      .merge(circles)
        .attr('fill', d => colorScale(d.type))
        .attr('r', d => radiusScale(d.type));
      
    circles.exit().remove();
      
    const text = selection
      .selectAll('text')
      .data(fruits);

    text
      .enter()
      .append('text')
        .attr('x', (d, i) => i * heightRatio(180) + heightRatio(100))
        .attr('y', height / 2 + heightRatio(120))
        .attr('class', 'fruits')
      .merge(text)
        .text(d => d.type);
      
    text.exit().remove();
  };
  
  globalThis.fruitBowl = fruitBowl;
})();