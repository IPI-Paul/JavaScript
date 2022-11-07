App = () => {
  const { 
    csv, select, scaleLinear, min, max, extent, range, axisLeft, axisBottom
  } = d3;

  const csvUrl = [
    '../../_Source Files and Scripts/',
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

  const xValue = (d) => d.petal_length;
  const yValue = (d) => d.sepal_length;
  const legend = (d) => d.species;
  const colorValue = (d) => (
    {
      setosa: 'skyblue',
      versicolor: 'magenta',
      virginica: 'orange'
    }[legend(d).toLowerCase()]
  );

  const margin = {top: 20, right: 20, bottom: 30, left: 50};
  const radius = 5;

  const width = innerWidth;
  const height = innerHeight - topMargin;

  const svg = 
    select('#root')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewbox', `0 0 ${width} ${height}`)
    .attr('xlmns', 'http://www.w3.org/2000/svg')
    .attr('class', 'plot1');

  const main = async () => {
    const data = window.location.href.startsWith('file') 
      ? iris 
      : await csv(csvUrl, parseRow);
  
    const x = scaleLinear()
      //.domain([min(data, xValue), max(data, xValue)]);
      //.domain([0, max(data, xValue)]) to start axis at 0
      .domain(extent(data, xValue)) // does both min and max
      .range([margin.left, width - margin.right]);
  
    const y = scaleLinear()
    .domain(extent(data, yValue)) // does both min and max
    .range([height - margin.bottom, margin.top]);
    
    const marks = data.map(d => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
      title: `${legend(d)} \nX: ${xValue(d)} \nY: ${yValue(d)}`,
      color: colorValue(d)
    }));

    svg
      .selectAll('circle')
      .data(marks)
      .join('circle')
      .attr('r', radius)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => d.color)
      .append('title')
      .text(d => d.title);
    
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(axisLeft(y));
    /* Can also be writen as
      const yAxis = axisLeft(y);
      const yAxisGroup = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`);
        either: yAxisGroup.call(yAxis); 
        or: yAxis(yAxisGroup);
    */
   /* Can also be writen as 
    axisLeft(y)(
      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
    );
   */
    
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisBottom(x));
  };
  main();
}

App();