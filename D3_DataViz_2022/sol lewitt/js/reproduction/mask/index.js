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

  const mask2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'mask'
  );
  mask2.setAttribute('id', 'circle-mask2');
  svg.appendChild(mask2);

  const maskRect2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'rect'
  );
  maskRect2.setAttribute('width', width);
  maskRect2.setAttribute('height', height);
  maskRect2.setAttribute('fill', 'white');
  mask2.appendChild(maskRect2);

  const circle2 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );
  circle2.setAttribute('cx', width / 2);
  circle2.setAttribute('cy', height / 2);
  circle2.setAttribute('r', height / 2);
  circle2.setAttribute('fill', 'black');
  mask2.appendChild(circle2);

  const m = 20;
  let n = parseInt(height / m);
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

  n = parseInt(width / m);
  for(let i = 0; i < n; i++) {
    const rect = document.createElementNS(
      'http://www.w3.org/2000/svg', 
      'rect'
    );
    rect.setAttribute('x', i * m);
    rect.setAttribute('width', 10);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', 'black');
    rect.setAttribute('mask', 'url(#circle-mask2)');
    svg.appendChild(rect);
  }
};
App();