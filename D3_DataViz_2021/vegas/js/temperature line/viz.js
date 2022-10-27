import vl from 'vega-lite-api';

export const viz = vl.markLine({
  size: 3, 
  opacity: 1
})
  .encode(
    vl.x().title('Timestamp').fieldT('timestamp').scale({ zero: false }),
    vl.y().title('Temperature').fieldQ('temperature').scale({ zero: false }),
    vl.tooltip().fieldN('temperature').format('.2f')
  );
/*
  fieldN = Nominal
  fieldT = Time
  fieldQ = Quantative
*/