(() => {
  const { json, csv } = d3;
  const { feature } = topojson;
      
  const formatData = d => {
    const [csvData, topoJSONData] = d;
    
    const rowById = csvData.reduce((accumulator, d) => {
      accumulator[d['Country code']] = d;
      return accumulator;
    }, {});

    const countries = feature(topoJSONData, topoJSONData.objects.countries);

    countries.features.forEach(d => {
      Object.assign(d.properties, rowById[+d.id]);
      d.properties['2018'] = (d.id 
        ? +d.properties['2018'] 
        : +d.properties['2018'].replace(/ /g, '')
      ) * 1000;
    });

    return countries;
  }; 

  const loadAndProcessData = async () => {
    if(scriptPath().startsWith('http')) {
      const csvUrl = [
        '..',
        '_Source Files and Scripts',
        'SourceFiles',
        'csv',
        'UN_Population_2019.csv'
      ];

      const jsonUrl = [
        '..',
        '_Source Files and Scripts',
        'SourceFiles',
        'json',
        'world-atlas-50m-1.1.4.json'
      ];

      return Promise
        .all([
          csv(csvUrl.join('/')),
          json(jsonUrl.join('/'))
        ])
        .then(formatData);
    } else {
      await loadData(srcDataJs, [
        'un_population_2019', 'world-atlas-50m-1.1.4'
      ], 5);
      unPopulation2019.columns = 
        Object.keys(unPopulation2019[0]);
      wolrdAtlas50M.columns = 
        Object.keys(wolrdAtlas50M);
      return formatData(
        [unPopulation2019, wolrdAtlas50M]
        );
    }
  };

  globalThis.loadAndProcessData = loadAndProcessData;
})();