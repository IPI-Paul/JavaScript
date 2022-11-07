App = () => {
  const width = innerWidth;
  const height = innerHeight - topMargin;

  const svg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewbox', `0 0 ${width} ${height}`);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('xlmns', 'http://www.w3.org/2000/svg');
  document.getElementById('outHTML').appendChild(svg);

  const m = 20;
  const n = parseInt(width / m);
  for(let i = 0; i < n; i++) {
    const rect = document.createElementNS(
      'http://www.w3.org/2000/svg', 
      'rect'
    );
    rect.setAttribute('x', i * m);
    rect.setAttribute('width', 10);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', 'black');
    svg.appendChild(rect);
  }
};
App();