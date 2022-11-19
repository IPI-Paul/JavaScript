(() => {
  const getCars = () => new Promise(resolve => {
    setTimeout(() => resolve(cars), 2000);
  });
  
  globalThis.getCars = getCars;
})();