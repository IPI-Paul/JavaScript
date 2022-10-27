import vl from 'vega-lite-api';

export const viz = vl.markPoint()
  .encode(
    vl.x().title('Acceleration').fieldQ('acceleration').scale({ zero: false }),
    vl.y().title('Horsepower').fieldQ('horsepower').scale({ zero: false }),
    vl.tooltip().title('Name').fieldN('name')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/