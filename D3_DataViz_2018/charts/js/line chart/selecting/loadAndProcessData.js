(() => {
  const { csv, range, timeParse } = d3;

  const parseYear = timeParse('%Y');
  const allCaps = str => str === str.toUpperCase();
  const isRegion = name => allCaps(name) && name !== 'WORLD';

  const melt = (unData, minYear, maxyear, column) => {
    const years = range(minYear, maxyear + 1);

    const data = [];
    unData.forEach(d => {
      const name = d[column].replace('AND THE', '&');
      years.forEach(year => {
        const population = +d[year].replace(/ /g, '') * 1000;
        const row = {
          year: parseYear(year), 
          name,
          population
        };
        data.push(row)
      });
    });

    return data.filter(d => isRegion(d.name));
  };
      
  const formatData = d => {
    const [unDataMediumVariant, unDataEstimates] = d;
    return melt(
      unDataEstimates, 1950, 2014, 
      'Region, subregion, country or area *'
    )
    .concat(
      melt(
        unDataMediumVariant, 2015, 2100, 
        'Major area, region, country or area *'
      )
    );
  }; 

  const loadAndProcessData = async () => {
    if(scriptPath().startsWith('http')) {
      const unDataMediumVariant = [
        '..',
        '_Source Files and Scripts',
        'SourceFiles',
        'csv',
        'population_estimates_2015_medium_variant.csv'
      ];

      const unDataEstimates = [
        '..',
        '_Source Files and Scripts',
        'SourceFiles',
        'csv',
        'un_population_estimates_2017.csv'
      ];
      
      return Promise
        .all([
          csv(unDataMediumVariant.join('/')),
          csv(unDataEstimates.join('/'))
        ])
        .then(formatData);
    } else {
      await loadData(srcDataJs, [
        'population_estimates_2015_medium_variant', 
        'un_population_estimates_2017'
      ]);
      populationEstimateMedium2015.columns = 
        Object.keys(populationEstimateMedium2015[0]);
      populationEstimate2017.columns = 
        Object.keys(populationEstimate2017[0]);
      return formatData(
        [populationEstimateMedium2015, populationEstimate2017]
        );
    }
  };
  
  globalThis.loadAndProcessData = loadAndProcessData;
  globalThis.parseYear = parseYear;
})();