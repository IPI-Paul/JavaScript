import vl from 'vega-lite-api';

export const viz = vl.markCircle({
  size: 300, 
  opacity: 0.5
})
  .encode(
    vl.x().title('Miles per Gallon').fieldQ('mpg').scale({ zero: false }),
    vl.y().title('Horsepower').fieldQ('horsepower').scale({ zero: false }),
    vl.color().title('Origin').fieldN('origin'),
    vl.tooltip().fieldN('name')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/