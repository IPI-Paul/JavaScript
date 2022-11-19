(() => {
  const colorLegend = (selection, props) => {
    const { colorScale, circleRadius, spacing, textOffset } = props;
      
    const groups = selection
      .selectAll('g')
      .data(colorScale.domain());

    const groupsEnter = groups
      .enter()
      .append('g');
    
    groupsEnter
      .merge(groups)
        .attr('transform', (d, i) => `translate(0, ${i * spacing})`
        );
      
    groups.exit().remove();

    groupsEnter
      .append('circle')
        .attr('class', 'legend-circle')
      .merge(groups.select('circle'))
        .attr('fill', colorScale)
        .attr('r', circleRadius);

    groupsEnter
      .append('text')
        .attr('class', 'multi-line-legend')
      .merge(groups.select('text'))        
        .text(d => d)
        .attr('dy', '0.32em')
        .attr('x', textOffset);
  };
  
  globalThis.colorLegend = colorLegend;
})();