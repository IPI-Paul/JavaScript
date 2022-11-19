(() => {
  const fruitBowl = (selection, props) => {
    const { scaleOrdinal } = d3;
    const { fruits, height, heightRatio, widthRatio, size, margin } = props;

    const colorScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range(['#c11d1d', '#e8e55a']);
    
    const radiusScale = scaleOrdinal()
      .domain(['apple', 'lemon'])
      .range([heightRatio(size.radius), heightRatio(size.radius - 20)]);
    
    const bowl = selection
      .selectAll('rect')
      .data([null])
      .enter()
      .append('rect')  
        .attr('class', 'bowl')
        .attr('y', heightRatio(margin.top))
        .attr('width', widthRatio(size.width))
        .attr('height', heightRatio(size.height))
        .attr('rx', heightRatio(size.height / 2));

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
            ${i * widthRatio(size.x) + widthRatio(margin.left)}, 
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
        .attr('y', widthRatio(size.x - (margin.left * 0.6)));
  };
  
  globalThis.fruitBowl = fruitBowl;
})();