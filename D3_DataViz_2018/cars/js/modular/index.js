(async () => {  
  await loadData(srcDataJs, ['cars']);
  await loadScripts(scriptPath() + '../', ['formatCar', 'generateReport']);
  
  const message = generateReport(cars, 2000, formatCar);
  document.getElementById('code').textContent = message;
})();