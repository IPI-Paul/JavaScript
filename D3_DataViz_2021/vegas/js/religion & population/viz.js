import vl from 'vega-lite-api';

export const viz = vl
  .markCircle()
  .encode(
    vl.x().title('Country').fieldN('country').sort('-y'),
    vl.y().title('Religion').fieldN('religion'),
    vl.size().title('Population').fieldQ('population'),
    vl.tooltip().fieldQ('population').format(',')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/