(() => {
  const { json, tsv } = d3;
  const { feature } = topojson;
      
  const formatData = d => {
    const [tsvData, topoJSONData] = d;
    const rowById = tsvData.reduce((accumulator, d) => {
      accumulator[d.iso_n3] = d;
      return accumulator;
    }, {});

      const countries = feature(topoJSONData, topoJSONData.objects.countries);

      countries.features.forEach(d => {
        Object.assign(d.properties, rowById[d.id]);
      });

      return countries;
  };


  const loadAndProcessData = async () => {
    if(scriptPath().startsWith('http')) {
      const jsonUrl = [
        '..',
        '_Source Files and Scripts',
        'SourceFiles',
        'json',
        'world-atlas-50m-1.1.4.json'
      ];

      return Promise
        .all([
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
  };
  
  globalThis.loadAndProcessData = loadAndProcessData;
})();