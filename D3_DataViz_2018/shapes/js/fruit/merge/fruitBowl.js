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
        .attr('cx', (d, i) => i * 120 + 60)
        .attr('cy', height / 2)
      .merge(circles)
        .attr('fill', d => colorScale(d.type))
        .attr('r', d => radiusScale(d.type));
      
    circles.exit().remove();
  };
  
  globalThis.fruitBowl = fruitBowl;
})();