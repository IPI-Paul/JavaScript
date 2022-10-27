import vl from 'vega-lite-api';

export const viz = vl.markCircle({
  size: 300, 
  opacity: 0.5
})
  .encode(
    vl.x().title('Displacement').fieldQ('displacement').scale({ zero: false }),
    vl.y().title('Horsepower').fieldQ('horsepower').scale({ zero: false }),
    vl.color().title('Origin').fieldN('origin'),
    vl.size().fieldQ('mpg'),
    vl.tooltip().fieldN('name')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/