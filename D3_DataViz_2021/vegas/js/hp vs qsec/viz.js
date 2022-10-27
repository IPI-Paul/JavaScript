import vl from 'vega-lite-api';

export const viz = vl.markPoint({
  fill: true, 
  stroke: false, 
  size: 200, 
  opacity: 0.2
})
  .encode(
    vl.x().title('Acceleration').fieldQ('acceleration').scale({ zero: false }),
    vl.y().title('Horsepower').fieldQ('horsepower').scale({ zero: false }),
    vl.tooltip().fieldN('name')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/