import vl from 'vega-lite-api';

export const viz = vl
  .markBar()
  .encode(
    vl.x().title('Country').fieldN('country').sort('-y'),
    vl.y().title('Population').fieldQ('population'),
    vl.color().title('Religion').fieldN('religion'),
    vl.tooltip().fieldN('population').format(',')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/