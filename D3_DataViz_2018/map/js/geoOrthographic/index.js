(async () => {
  const { select, json, geoPath, geoOrthographic } = d3;
  const { feature } = topojson;

  const defaults = {width: 1150, height: 550}
  const width = innerWidth < defaults.width ? innerWidth : defaults.width;
  const height = (innerHeight < defaults.height ? innerHeight : defaults.height) - topMargin;
    
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'world-atlas')
      .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`);

  const projection = geoOrthographic();
  const pathGenerator = geoPath().projection(projection);

  const formatData = data => {
      const countries = feature(data, data.objects.countries);
  
      svg
        .selectAll('path')
        .data(countries.features) 
        .enter()
        .append('path')
          .attr('d', d=> pathGenerator(d));
    };
  
    if(scriptPath().startsWith('http')) {
      const jsonUrl = [
        '..',
        '_Source Files and Scripts',
        'SourceFiles',
        'json',
        'world-atlas-110m-1.1.4.json'
      ];
  
      json(jsonUrl.join('/'))
        .then(formatData);
    } else {
      await loadData(srcDataJs, ['world-atlas-110m-1.1.4']);
      wolrdAtlas110M.columns = 
        Object.keys(wolrdAtlas110M);
      formatData(wolrdAtlas110M);
    }
})();