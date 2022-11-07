scatterPlot = () => {};
App = () => {
  let ret;
  ret = loadScripts(scriptPath(), ['scatterPlot']);
  if(ret || scatterPlot === undefined) {
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

  const parseRow = (d) => {
    for(let obj of ["sepal_length", "sepal_width", "petal_length"]){
      d[obj] = +d[obj];
    }
    return d;
  };

  const width = innerWidth;
  const height = innerHeight - topMargin;
    
  const svg = select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${width} ${height}`)
    .attr('xlmns', 'http://www.w3.org/2000/svg')
    .attr('class', 'plot1');
    
  const main = async () => {
    svg.call(
      scatterPlot()
        .width(width)
        .height(height)
        .data(
          window.location.href.startsWith('file') 
            ? iris 
            : await csv(csvUrl, parseRow)
        )
        .xValue((d) => d.petal_length)
        .yValue((d) => d.sepal_length)
        .legend((d) => d.species)
        .colorValue((d) => (
          {
            setosa: 'skyblue',
            versicolor: 'magenta',
            virginica: 'orange'
          }[d.species.toLowerCase()]
        ))      
        .symbolValue((d) => d.species)
        .margin({top: 20, right: 20, bottom: 30, left: 50})
        .size(50)
      );
  };
  main();
}

App();