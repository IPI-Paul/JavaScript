(async () => {
  const { select, json, tree, hierarchy, linkHorizontal, zoom } = d3;

  const svg = select('#root')
    .append('svg');

  const width = document.body.clientWidth;
  const height = document.body.clientHeight - topMargin;
  const margin = { top: 0, right: 50, bottom: 0, left: 75 };
  const inner = {
    width: width - margin.left - margin.right, 
    height: height - margin.top - margin.bottom
  };

  const treeLayout = tree()
    .size([inner.height, inner.width]);

  const zoomG = svg
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'world-countries')
    .append('g');

  const g = zoomG
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  svg.call(zoom().on('zoom', (event, _) => {
    zoomG.attr('transform', event.transform)
  }));  
      
  const formatData = data => {
    const root = hierarchy(data);
    const links = treeLayout(root)
      .links();
    const linkPathGenerator = linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    g
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
        .attr('d', linkPathGenerator);

    g
      .selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
        .attr('x', d => d.y)
        .attr('y', d => d.x)
        .attr('dy', '0.32em')
        .attr('text-anchor', d => d.children ? 'middle' : 'start')
        .attr('font-size', d => 3.05 - d.depth + 'em')
      .text(d => d.data.data.id);
  };
  
  if(scriptPath().startsWith('http')) {
    const jsonUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'json',
      'countryHierarchy.json'
    ];

    json(jsonUrl.join('/'))
      .then(formatData);
  } else {
    await loadData(srcDataJs, ['countryHierarchy']);
    countryHierarchy.columns = 
      Object.keys(countryHierarchy);
    return formatData(countryHierarchy);
  }
})();