(async () => {
  await loadScripts(scriptPath(), ['loadAndProcessData', 'colorLegend']);

  const { 
    select, geoPath, geoNaturalEarth1, zoom, scaleOrdinal, schemeSpectral 
  } = d3;

  const defaults = {width: 1150, height: 350};
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

  const margin = {top: 70, right: 100, bottom: 25, left: 15};
  const size = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 20,
    right: 70,
    bottom: 60,
    left: 600,
    x: 200,
    y: 20,
    radius: 8
  };
    
  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'choropleth-atlas')
      .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`)
      .attr('transform', 'translate(100, 0)');

  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);

  const g = svg.append('g');

  const colorLegendG = svg
    .append('g')
      .attr('transform', `translate(${widthRatio(margin.left)}, ${heightRatio(height / 1.5)})`);

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

  const colorScale = scaleOrdinal();
  const colorValue = d => d.properties.income_grp;

  loadAndProcessData().then(countries => {

    colorScale
      .domain(countries.features.map(colorValue))
      .domain(colorScale.domain().sort().reverse())
      .range(schemeSpectral[colorScale.domain().length]);

    colorLegendG
    .call(
      colorLegend, 
      { 
        colorScale, 
        circleRadius: size.radius, 
        spacing: size.y,
        textOffset: size.y - (size.radius * 0.6), 
        backGroundRectWidth: widthRatio(size.x) 
      }
    ); 

    g.selectAll('path')
      .data(countries.features) 
      .enter()
      .append('path')
        .attr('class', 'choropleth')
        .attr('d', pathGenerator)
        .attr('fill', d => colorScale(colorValue(d)))
      .append('title')
        .text(d => d.properties.name + '\n' + colorValue(d));
  });
})();