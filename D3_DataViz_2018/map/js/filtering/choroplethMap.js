(() => {
  const choroplethMap = (selection, props) => {
    const { features, colorScale, colorValue, selectedColorValue } = props;

    const { 
      geoPath, geoNaturalEarth1, zoom 
    } = d3;

    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);

    const gUpdate = selection.selectAll('g').data([null]);
    const gEnter = gUpdate.enter().append('g');
    const g = gUpdate.merge(gEnter);

    gEnter
      .append('path')
        .attr('class', 'sphere')
        .attr('d', pathGenerator({type: 'Sphere'}))
      .merge(gUpdate.select('.sphere'))
      .attr('opacity', selectedColorValue ? 0.05 : 1);
    
    selection
      .call(
        zoom()
          .on('zoom', (event, _) => {
            g.attr('transform', event.transform);
          })
      );

    const countryPaths = g.selectAll('.choropleth')
      .data(features);
      
    const countryPathsEnter = countryPaths
      .enter()
      .append('path')
        .attr('class', 'choropleth');

    countryPaths
      .merge(countryPathsEnter)
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('opacity', d => 
          (!selectedColorValue || selectedColorValue === colorValue(d)) 
          ? 1
          : 0.2
        )
        .classed('highlighted', d => 
        selectedColorValue && selectedColorValue === colorValue(d));

    countryPathsEnter
      .append('title')
        .text(d => d.properties.name + '\n' + colorValue(d));
  };

  globalThis.choroplethMap = choroplethMap;
})();