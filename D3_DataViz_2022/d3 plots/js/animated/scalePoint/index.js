scatterPlot = () => {};
App = () => {
  let ret;
  ret = loadScripts(scriptPath(), ['menu', 'scatterPlot']);
  if(ret || scatterPlot === undefined || menu === undefined) {
    setTimeout(() => {App();}, 100);
    return console.log('Loading...');
  }
  clearTimeout();

  const { csv, select } = d3;
  
  const csvUrl = [
    '../../../_Source Files and Scripts/',
    'SourceFiles/',
    ,'csv/'
    ,'iris.csv'
  ].join('');

  const width = innerWidth;
  const height = innerHeight - topMargin;
  const wait = 500;
  const columns = ['petal_width', 'sepal_width', 'petal_length', 'sepal_length', 'species'];
  const options = columns.map(
    d => ({
      value: d, 
      text: d.toProperCase(),
      type: ['species'].includes(d) ? 'categorical' : 'quantitative'
    })
  );

  const parseRow = (d) => {
    for(let obj of columns){
      d[obj] = isNaN(d[obj]) ? d[obj] : +d[obj];
    }
    return d;
  };
    
  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${width} ${height}`)
    .attr('xlmns', 'http://www.w3.org/2000/svg')
    .attr('class', 'plot1');
  
  const menuContainer = select('#root')
    .append('div')
    .attr('class', 'menu-container');
  
  const xMenu = menuContainer.append('div');
  const xDefault = 'petal_width';
  const yMenu = menuContainer.append('div');
  const yDefault = 'sepal_length';
  const color = 'species';
    
  const main = async () => {
    const plot = 
      scatterPlot()
        .width(width)
        .height(height)
        .data(
          window.location.href.startsWith('file') 
            ? iris 
            : await csv(csvUrl, parseRow)
        )
        .xValue((d) => d[xDefault])
        .yValue((d) => d[yDefault])
        .legend((d) => d[color])
        .colorValue((d) => (
          {
            setosa: 'skyblue',
            versicolor: 'magenta',
            virginica: 'orange'
          }[d[color].toLowerCase()]
        ))      
        .margin({top: 45, right: 20, bottom: 40, left: 70, x_axis: 10, y_axis: 20})
        .radius(5)
        .interval(wait)
        .xAxisTitle(xDefault.toProperCase())
        .yAxisTitle(yDefault.toProperCase());
      
    svg.call(plot);

    /* Can be simplified as below 
      const columnToType = new Map();
      options.forEach(option => {
        columnToType.set(option.value, option.type);
      });
    */
    /* without deconstructors
    const columnToType = new Map(
      options.map((option) => [option.value, option.type])
    );
    */
    const columnToType = new Map(
      options.map(({ value, type }) => [value, type])
    );

    const getType = column => 
      columnToType.get(column);
      /* slower as iterating through each row
        options.find(d => d.value === column).type; 
      */

    xMenu.call(
      menu()
        .id('x-menu')
        .labelText('X: ')
        .options(options)
        .on('change', column => {
          svg
            .call(
              plot
                .xValue(d => d[column])
                .xAxisTitle(column.toProperCase())
                .xType(getType(column))
            );
        })
        .selected(xDefault)
    );

    yMenu.call(
      menu()
        .id('y-menu')
        .labelText('Y: ')
        .options(options)
        .on('change', column => {
          svg
            .call(
              plot
                .yValue(d => d[column])
                .yAxisTitle(column.toProperCase())
                .yType(getType(column))
            );
        })
        .selected(yDefault)
    );
  };
  main();
}

App();