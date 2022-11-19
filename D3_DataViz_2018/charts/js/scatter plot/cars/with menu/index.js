(async () => {
  await loadScripts(scriptPath(), ['menu']);
  const { 
    select, csv, scaleLinear, scalePoint, extent, axisLeft, axisBottom, format 
  } = d3;

  const defaults = {width: 1150, height: 500};
  const client = {width: document.body.clientWidth, height: document.body.clientHeight};
  const width = client.width < defaults.width ? client.width : defaults.width;
  const height = (client.height < defaults.height ? client.height : defaults.height) - topMargin;

  const margin = {top: 70, right: 50, bottom: 70, left: 100};
  const inner = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 20,
    left: 70,
    bottom: 60
  }

  const render = data => {
    const columns = data.columns.filter(d => d !== 'name').map(d => 
      ({
        value: d,
        text: d.toProperCase(),
        type: ['year', 'origin', 'name'].includes(d) 
          ? 'categorical' 
          : 'quantitative'
      })
    );

    const columnToType = new Map(
      columns.map(({ value, type }) => [value, type])
    );
  
    const getType = column => 
      columnToType.get(column);

    xMenu.call(
      menu()
        .id('x-menu')
        .labelText('X: ')
        .options(columns)
        .on('change', column => {
          xDefault = column;
          plot.selectAll('g').remove();
          return render(data);
        })
        .selected(xDefault)
    );

    yMenu.call(
      menu()
        .id('y-menu')
        .labelText('Y: ')
        .options(columns)
        .on('change', column => {
          yDefault = column;
          [margin.left, inner.left] = ['origin', 'name'].includes(column) 
          ? [120, 90]
          : [100, 70]
          plot.selectAll('g').remove();
          return render(data);
        })
        .selected(yDefault)
    );

    const columnToText = new Map(
      columns.map(({ value, text }) => [value, text])
    );
  
    const getText = column => 
      columnToText.get(column);

    const xType = {
      value: xDefault, 
      text: getText(xDefault),
      type: getType(xDefault)
    };
    const yType = {
      value: yDefault, 
      text: getText(yDefault),
      type: getType(yDefault)
    };
    const xValue = d => d[xType.value];
    const xAxisLabel = xType.text;
    const yValue = d => d[yType.value];
    const yAxisLabel = yType.text;
    const circleRadius = 10;
    const chartTitle = `Cars: ${xAxisLabel} vs ${yAxisLabel}`;
    
    const xScale = (xType.type === 'categorical' 
      ? scalePoint()
        .domain(data.map(xValue))
        .padding(0.2)
      : scaleLinear()
        .domain(extent(data, xValue))        
        .nice()
    ).range([0, inner.width]);

    const yScale = (yType.type === 'categorical' 
    ? scalePoint()
        .domain(data.map(yValue))
        .padding(0.2)
    : scaleLinear()
      .domain(extent(data, yValue))      
      .nice()
    ).range([inner.height, 0]);
  
    const g = plot
      .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'bar-chart');

    const xAxis = axisBottom(xScale)
      .tickSize(-inner.height)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
    .tickSize(-inner.width)
    .tickPadding(10);

    const yAxisG = g.append('g')
    .call(yAxis);

    yAxisG
      .selectAll('.domain')
        .remove();

    yAxisG
      .append('text')
        .attr('class', 'axis-label')
        .attr('y', -inner.left)
        .attr('x', -inner.height / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g.append('g')
      .call(xAxis)
        .attr('transform', `translate(0, ${inner.height})`);

    xAxisG.select('.domain').remove();

    xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('y', inner.bottom)
      .attr('x', inner.width / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    g.selectAll('circle')
      .data(data)
        .enter()
      .append('circle')
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', circleRadius);
    
    g.append('text')
      .attr('class', 'title')
      .attr('y', -inner.top)
      .attr('x', inner.width / 2)
      .text(chartTitle);
  };
  const svg = select('#root');

  const plot = svg
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', '0 0 1500 800');  

  const menuContainer = select('#root')
    .append('div')
      .attr('class', 'menu-container')
      .attr('style', 'width: ' + defaults.width + 'px;');
  
  const xMenu = menuContainer.append('span');
  let xDefault = 'horsepower';
  const yMenu = menuContainer.append('span');
  let yDefault = 'weight'; 

  const formatData = d => {
    d.mpg = +d.mpg;
    d.cylinders = +d.cylinders;
    d.displacement = +d.displacement;
    d.horsepower = +d.horsepower;
    d.weight = +d.weight;
    d.acceleration = +d.acceleration;
    d.year = +d.year + 1900;
    d.origin = d.origin == 1 
      ? 'USA'
      : d.origin == 2
        ? 'Germany'
        : 'Japan';
  };

  if(scriptPath().startsWith('http')) {
    const csvUrl = [
      '..',
      '_Source Files and Scripts',
      'SourceFiles',
      'csv',
      'auto.csv'
    ];

    csv(csvUrl.join('/'))
      .then(data => {
        data.forEach(formatData);
        render(data);
      });
  } else {
    await loadData(srcDataJs, ['auto-mpg']);
    auto_mpg.columns = Object.keys(auto_mpg[0]);
    auto_mpg.forEach(formatData);
    render(auto_mpg);
  }
})();