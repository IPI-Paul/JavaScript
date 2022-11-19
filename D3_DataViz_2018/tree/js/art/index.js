(async () => {
  const { select, json, tree, hierarchy, linkHorizontal } = d3;

  const svg = select('#root')
    .append('svg');

  const width = document.body.clientWidth;
  const height = document.body.clientHeight - topMargin;

  const treeLayout = tree()
    .size([height, width]);

  svg
    .attr('width', width)
    .attr('height', height);
      
  const formatData = data => {
    const root = hierarchy(data);
    const links = treeLayout(root)
      .links();
    const linkPathGenerator = linkHorizontal()
      .x(d => d.y)
      .y(d => d.x);

    svg
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
        .attr('d', linkPathGenerator);
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