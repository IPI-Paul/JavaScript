(async () => {
  const { select, json, tsv, geoPath, geoNaturalEarth1, zoom } = d3;
  const { feature } = topojson;

  const defaults = {width: 1150, height: 550};
  const width = innerWidth < defaults.width ? innerWidth : defaults.width;
  const height = (innerHeight < defaults.height ? innerHeight : defaults.height) - topMargin;
    
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'earth-atlas')
      .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`);

  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);

  const g = svg.append('g');

  g.append('path')
    .attr('class', 'sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

  svg
    .call(
      zoom()
        .on('zoom', (event, _) => {
          g.attr('transform', event.transform);
        })
    );

  const formatData = d => {
    [tsvData, topoJSONData] = d;

    /* Curran prefers reduce
    const countryName = {};
    tsvData.forEach(d => {
      countryName[d.iso_n3] = d.name;
    });
    */
    const countryName = tsvData.reduce((accumulator, d) => {
      accumulator[d.iso_n3] = d.name;
      return accumulator;
    }, {});

    const countries = feature(topoJSONData, topoJSONData.objects.countries);
    g.selectAll('path')
      .data(countries.features) 
      .enter()
      .append('path')
        .attr('class', 'country')
        .attr('d', d => pathGenerator(d))
      .append('title')
        .text(d => countryName[d.id]);
  };

  if(scriptPath().startsWith('http')) {
    const jsonUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'json',
      'world-atlas-50m-1.1.4.json'
    ];

    return Promise.all([
      tsv(jsonUrl.map(d => d.replace('json', 'tsv')).join('/')),
      json(jsonUrl.join('/'))
    ])
      .then(formatData);
  } else {
    await loadData(srcDataJs, [
      'world-atlas-50m-1.1.4.min', 'world-atlas-50m-1.1.4'
    ], 5);
    worldAtlas50Mtsv.columns = 
      Object.keys(worldAtlas50Mtsv[0]);
    wolrdAtlas50M.columns = 
      Object.keys(wolrdAtlas50M);
    return formatData(
      [worldAtlas50Mtsv, wolrdAtlas50M]
      );
  }
})();