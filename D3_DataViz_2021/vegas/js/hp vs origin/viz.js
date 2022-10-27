import vl from 'vega-lite-api';

export const viz = vl.markCircle({
  size: 300, 
  opacity: 0.5
})
  .encode(
    vl.x().title('Origin').fieldN('origin').scale({ zero: false }),
    vl.y().title('Horsepower').fieldQ('horsepower').scale({ zero: false }),
    vl.color().title('Weight').fieldQ('weight'),
    vl.size().fieldQ('mpg'),
    vl.tooltip().fieldN('name')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/