(function (React$1, ReactDOM, d3, topojson, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const jsonUrl = 'http://localhost:8080/SourceFiles/json/countries-50m.json';
  let it$1 = 0;

  const useData = () => {
    const [landData, setData] = ipi.useState({obj: 'landData', state: null});

    if(it$1 == 0) {
      it$1 = 1;
      d3.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
        setData({obj: 'landData', state: {
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        }});
      });
    } else {
      it$1 = 0;
    }

    return landData;
  };

  const csvUrl = 'http://localhost:8080/SourceFiles/csv/worldcities_clean.csv';
  let it = 0;

  const row = d => {
    d.lat = +d.lat;
    d.lng = +d.lng;
    d.population = +d.population;
    return d;
  };

  const useCities = () => {
    const [cityData, setData] = ipi.useState({obj: 'cityData', state: null});

    if(it == 0) {
      it = 1;
      d3.csv(csvUrl, row).then(cityData => setData({obj: 'cityData', state: cityData}));
    } else {
      it = 0;
    }

    return cityData;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  const Marks = ({
    worldAtlas: {land, interiors },
    cities
  }) => (
    React.createElement('g', {className: "marks"}, [
      React.createElement('path', {className: "pSphere", d: path({ type: 'Sphere' })}),
      React.createElement('path', {className: "pGraticules", d: path(graticule())}),

        land.features.map(feature => (
          React.createElement('path', {className: "pLand", d: path(feature)})
        )),

      React.createElement('path', {className: "pInteriors", d: path(interiors)}),
      cities.map(d => {
        const [x, y] = projection([d.lng, d.lat]);
        return React.createElement('circle', {cx: x, cy: y, r: 1.5})
      })
    ])
  );

  let worldAtlas;
  let cities;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;

  const App = () => {
    worldAtlas = worldAtlas ? worldAtlas : useData();
    cities = cities ? cities : useCities();

    if(!worldAtlas || !cities) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
          Marks({worldAtlas: worldAtlas, cities: cities})
      ])
    )
  };
  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'Points on a Map';
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, d3, topojson, ipi);
