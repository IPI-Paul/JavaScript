(() => {
  const colorLegend = (selection, props) => {
    const { 
      colorScale, circleRadius, spacing, textOffset, backGroundRectWidth, onClick,
      selectedColorValue 
    } = props;

    const backGroundRect = selection.selectAll('rect')
      .data([null]);

    const n = colorScale.domain().length;

    backGroundRect
      .enter()
      .append('rect')
      .merge(backGroundRect)
        .attr('x', -circleRadius * 2)
        .attr('y', -circleRadius * 2)
        .attr('rx', circleRadius * 2)
        .attr('width', backGroundRectWidth)
        .attr('height', spacing * n + circleRadius * 2)
        .attr('fill', 'white')
        .attr('opacity', 0.5);
      
    const groups = selection
      .selectAll('g')
      .data(colorScale.domain());

    const groupsEnter = groups
      .enter()
      .append('g');
    
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`)
        .attr('opacity', d => 
          (!selectedColorValue || d === selectedColorValue) 
          ? 1 
          : 0.2
        )
        .on('click', onClick);
      
    groups.exit().remove();

    groupsEnter
      .append('circle')
        .attr('class', 'legend-circle')
      .merge(groups.select('circle'))
        .attr('fill', colorScale)
        .attr('r', circleRadius);

    groupsEnter
      .append('text')
        .attr('class', 'legends')
      .merge(groups.select('text'))        
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
  };
  
  globalThis.colorLegend = colorLegend;
})();