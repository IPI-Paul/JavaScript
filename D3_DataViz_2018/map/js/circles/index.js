(async () => {
  await loadScripts(scriptPath(), ['loadAndProcessData', 'sizeLegend']);

  const { 
    select, geoPath, geoCentroid, geoNaturalEarth1, zoom, scaleSqrt, max, format
  } = d3;

  const defaults = {width: 1150, height: 340};
  const client = {width: document.body.clientWidth, height: document.body.clientHeight};
  const width = client.width > defaults.width ? client.width : defaults.width;
  const height = (client.height > defaults.height ? client.height : defaults.height) - topMargin;
  
  const widthRatio = (input) => (
    height < defaults.height - topMargin 
      ? ((input / innerWidth) * width) - ((input * .3) * (width / defaults.width))
      : input
  );

  const heightRatio = (input) => (
    height < defaults.height - topMargin
      ? (input / (defaults.height - topMargin)) * height
      : (input / height) * (defaults.height - topMargin)
  );

  const margin = {top: 70, right: 100, bottom: 25, left: 110};
  const inner = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 40,
    right: 70,
    bottom: 60,
    left: 50,
    x: 30,
    y: 30,
    radius: 30
  };
    
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'circles-atlas')
      .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`)
      .attr('transform', 'translate(100, 0)');

  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);
  const radiusValue = d => d.properties['2018']
  const populationFormat = (d, n) => format(',.3s')(d ? d.properties['2018'] : n)
    .replace('G', 'B');
    
  const tooltip = d => isNaN(radiusValue(d)) 
    ? 'Missing Data' 
    : 'Country: ' + d.properties.Country + '\nPopulation: ' + populationFormat(d);


  const g = svg.append('g');

  g.append('path')
    .attr('class', 'circles-sphere')
    .attr('d', pathGenerator({type: 'Sphere'}));

  svg
    .call(
      zoom()
        .on('zoom', (event, _) => {
          g.attr('transform', event.transform);
        })
    );

  loadAndProcessData().then(countries => {
    const sizeScale = scaleSqrt()
      .domain([0, max(countries.features, radiusValue)])
      .range([0, 30]);
      
    g
      .append('g')
        .attr('transform', `translate(${widthRatio(inner.left)}, ${heightRatio(height / 3.5)})`)
        .call(
          sizeLegend, 
          { 
            sizeScale, 
            spacing: inner.y,
            textOffset: inner.x,
            numTicks: 5,     
            tickFormat: populationFormat      
          }
        )
        .append('text')
          .attr('class', 'legend-title')
          .attr('y', -inner.top)
          .attr('x', -inner.x)
          .text('Population'); 

    g.selectAll('path')
      .data(countries.features) 
      .enter()
      .append('path')
        .attr('class', 'circles-map')
        .attr('d', pathGenerator)
        .attr('fill', d => d.properties['2018'] ? '#d8d8d8' : '#fec1c1')
      .append('title')
        .text(tooltip);

    countries.features.forEach(d => {
      d.properties.projected = projection(geoCentroid(d));
    });
    
    g.selectAll('circle')
      .data(countries.features)
      .enter()
      .append('circle')
        .attr('class', 'country-circle')
        .attr('cx', d => d.properties.projected[0])
        .attr('cy', d => d.properties.projected[1])
        .attr('r', d => sizeScale(radiusValue(d)))
      .append('title')
        .text(tooltip);
  });
})();