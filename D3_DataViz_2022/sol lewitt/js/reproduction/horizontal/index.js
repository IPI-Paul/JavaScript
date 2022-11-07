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

  const mask = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'mask'
  );
  mask.setAttribute('id', 'circle-mask');
  svg.appendChild(mask);

  const maskRect = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect'
  );
  maskRect.setAttribute('width', width);
  maskRect.setAttribute('height', height);
  maskRect.setAttribute('fill', 'black');
  mask.appendChild(maskRect);

  const circle = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle.setAttribute('cx', width / 2);
  circle.setAttribute('cy', height / 2);
  circle.setAttribute('r', height / 2);
  circle.setAttribute('fill', 'white');
  mask.appendChild(circle);

  const m = 20;
  const n = parseInt(height / m);
  for(let i = 0; i < n; i++) {
    const rect = document.createElementNS(
      'http://www.w3.org/2000/svg', 
      'rect'
    );
    rect.setAttribute('y', i * m);
    rect.setAttribute('width', width);
    rect.setAttribute('height', 10);
    rect.setAttribute('mask', 'url(#circle-mask)');
    rect.setAttribute('fill', 'black');
    svg.appendChild(rect);
  }
};
App();