(async () => {
  await loadScripts(scriptPath(), ['dropdownMenu', 'scatterPlot']);
  const { select, csv } = d3;

  const defaults = {width: 1150, height: 350}
  const width = innerWidth < defaults.width ? innerWidth : defaults.width;
  const height = (innerHeight < defaults.height ? innerHeight : defaults.height) - topMargin;
  const margin = {top: 30, right: 50, bottom: 90, left: 100};
  const inner = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    top: 20,
    left: 70,
    bottom: 60
  }

  let data;
  let xColumn;
  let yColumn;
  let columns;

  const onXColumnClicked = column => {
    xColumn = column;
    render();
  }

  const onYColumnClicked = column => {
    yColumn = column;
    render();
  }

  const render = () => {
    const [xType, yType] = columns([xColumn, yColumn]);

    const menus = select('#root')
      .selectAll('.menus')
      .data([null])
      .enter()
      .append('div')
        .attr('class', 'menus')
        .attr('style', 'width: ' + defaults.width + 'px;');

    menus
      .call(dropdownMenu, {
        options: columns,
        onOptionClicked: onYColumnClicked, 
        selectedOption: yColumn,
        id: 'y-menu'
      });

    menus.selectAll('text').data([null]).enter().append('text').text('VS.')
    
    menus
      .call(dropdownMenu, {
        options: columns,
        onOptionClicked: onXColumnClicked, 
        selectedOption: xColumn,
        id: 'x-menu'
      });

    svg
      .call(scatterPlot, {
        xValue: d => d[xType.value],
        xAxisLabel: xType.text,
        yValue: d => d[yType.value],
        yAxisLabel: yType.text,
        circleRadius: 10,
        title: `Cars: ${xType.text} vs ${yType.text}`,
        margin,
        width,
        height,
        data,
        xType, 
        yType,
        inner
      });
  };

  const svg = select('#root')
    .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewbox', `0 0 ${defaults.width} ${defaults.height}`);  

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
  
    columns = (items) => {
      const obj = data.columns.filter(d => d !== 'name').map(d => 
        ({
          value: d,
          text: d.toProperCase(),
          type: ['year', 'origin', 'name'].includes(d) 
            ? 'categorical' 
            : 'quantitative'
        })
      );
      
      return items 
        ? [obj.find(d => d.value === items[0]), obj.find(d => d.value === items[1])] 
        : obj;
    };

    xColumn = data.columns[4];
    yColumn = data.columns[0];
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
      .then(loadedData => {
        data = loadedData;
        data.forEach(formatData);
        render();
      });
  } else {
    await loadData(srcDataJs, ['auto-mpg']);
    auto_mpg.columns = Object.keys(auto_mpg[0]);
    data = auto_mpg;
    data.forEach(formatData);
    render();
  }
})();