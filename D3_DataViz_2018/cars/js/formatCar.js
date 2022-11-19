(() => {
  const formatCar = car => {
    const {
      year,
      make,
      model,
      price
    } = car;

    return `${year} ${make} ${model}: $${(+price).toLocaleString(
      'en-UK', {minimumFractionDigits: 2}
      )}`;
  };
  
  globalThis.formatCar = formatCar;
})();
