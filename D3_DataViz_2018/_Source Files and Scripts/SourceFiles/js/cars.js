!globalThis.hasOwnProperty('cars')
&& (() => {
  const cars = linesToObject(
`year,make,model,price
2000,Honda,Accord,2800
2012,Nissan,Leaf,1800
2009,Ford,F150,1950
2003,Honda,Pilot,2200
2009,Chevrolet,Tailblazer,1550
`);
  
  globalThis.cars = cars;
})();    