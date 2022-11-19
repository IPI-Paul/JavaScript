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
      
    const groups = selection
      .selectAll('g')
      .data(fruits);

    const groupsEnter = groups
      .enter()
      .append('g');
    
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) =>
          `translate(
            ${i * heightRatio(180) + heightRatio(100)}, 
            ${height / 2}
            )`
        );
      
    groups.exit().remove();
      
    const circles = groups.select('circle');

    groupsEnter
      .append('circle')
      .merge(groups.select('circle'))
        .attr('fill', d => colorScale(d.type))
        .attr('r', d => radiusScale(d.type));

    groupsEnter
      .append('text')
        .attr('class', 'fruits')
      .merge(groups.select('text'))        
        .text(d => d.type)
        .attr('y', heightRatio(120));
  };
  
  globalThis.fruitBowl = fruitBowl;
})();