(() => {
  const xPoisition = (d, i) => i * 120 + 60;

  const fruitBowl = (selection, props) => {
    const { scaleOrdinal } = d3;

    const { fruits, height, heightRatio, onClick, selectedFruit } = props;

    const colorScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range(['#c11d1d', '#e8e55a']);
    
    const radiusScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range([heightRatio(50), heightRatio(30)]);
      
    const circles = selection
      .selectAll('circle')
      .data(fruits, d => d.id);

    circles
      .enter()
      .append('circle')
      .attr('cx', xPoisition)
        .attr('cy', height / 2)
        .attr('r', 0)
      .merge(circles)
        .attr('fill', d => colorScale(d.type))
        .attr('stroke-width', 5)
        .attr('stroke', d => 
            d.id === selectedFruit 
              ? 'black'
              : 'none'
        )
        .on('click', (event, d) => onClick(d.id))
      .transition()
        .duration(1000)
        .attr('cx', xPoisition)
        .attr('r', d => radiusScale(d.type));
      
    circles.exit()
      .transition()
        .duration(1000)
        .attr('r', 0)
      .remove();
  };
  
  globalThis.fruitBowl = fruitBowl;
})();