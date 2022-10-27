(function (vega, vegaLite, vl, vegaTooltip, d3) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var vega__default = /*#__PURE__*/_interopDefaultLegacy(vega);
  var vegaLite__default = /*#__PURE__*/_interopDefaultLegacy(vegaLite);
  var vl__default = /*#__PURE__*/_interopDefaultLegacy(vl);

  // Apearance customisation to improve readability
  // See https:// vega.github.io/vega-lite/docs/
  const dark = '#3e3c38';
  const config = {
    axis: {
      domain: false,
      tickflow: 'lightGray'
    },
    style: {
      "guide-label": {
        fontSize: 20,
        fill: dark
      },
      "guide-title": {
        fontSize: 30,
        fill: dark,
        labelLimit: 0
      }
    }
  };

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/religionByCountryTop5.csv';

  const getData = async () => {
    const data = await d3.csv(csvUrl);

    // Have a look at the attributes available in the console!
    console.log(data[0]);

    return data;
  };

  const viz = vl__default["default"]
    .markCircle()
    .encode(
      vl__default["default"].x().title('Country').fieldN('country').sort('-y'),
      vl__default["default"].y().title('Religion').fieldN('religion'),
      vl__default["default"].size().title('Population').fieldQ('population'),
      vl__default["default"].tooltip().fieldQ('population').format(',')
    );
  /*
    fieldN = Nominal
    fieldT = Time
    fieldQ = Quantative
  */

  vl__default["default"].register(vega__default["default"], vegaLite__default["default"], {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call); }
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight - 20)
      .autosize({ type: 'fit', contains: 'padding' })
      .config(config);

      document.body.appendChild(await marks.render());
  };
  run();

})(vega, vegaLite, vl, vegaTooltip, d3);
