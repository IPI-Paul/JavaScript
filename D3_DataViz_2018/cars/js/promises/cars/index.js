(async () => {  
  await loadData(srcDataJs, ['cars'])
  await loadScripts(scriptPath() + '../../', ['formatCar', 'generateReport']);
  await loadScripts(scriptPath(), ['getCars']);

  document.getElementById('code').textContent = 'Loading...';

  getCars().then(cars => {
    const message = generateReport(cars, 2000, formatCar);
    document.getElementById('code').textContent = message;
  });
})();