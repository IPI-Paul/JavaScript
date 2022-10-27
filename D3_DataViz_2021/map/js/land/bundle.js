(function (React$1, ReactDOM, d3, topojson, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const jsonUrl = 'http://localhost:8080/SourceFiles/json/countries-50m.json';
  let it = 0;

  const useData = () => {
    const [landData, setData] = ipi.useState({obj: 'landData', state: null});

    if(it == 0) {
      it = 1;
      d3.json(jsonUrl).then(topology => {
        const { countries, land } = topology.objects;
        setData({obj: 'landData', state: {
          land: topojson.feature(topology, land),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        }});
      });
    } else {
      it = 0;
    }

    return landData;
  };

  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();

  const Marks = ({ data: {land, interiors } }) => (
    React.createElement('g', {className: "marks"}, [
      React.createElement('path', {className: "sphere", d: path({ type: 'Sphere' })}),
      React.createElement('path', {className: "graticules", d: path(graticule())}),

        land.features.map(feature => (
          React.createElement('path', {className: "land", d: path(feature)})
        )),

      React.createElement('path', {className: "interiors", d: path(interiors)})
    ])
  );

  let data;
  const width = window.innerWidth - 10;
  const height = window.innerHeight - 40;

  const App = () => {
    data = useData();

    if(!data) {
      return React__default["default"].createElement('pre', null, ["Loading..."]);
    }

    return (
      React__default["default"].createElement('svg', {width: width, height: height}, [
          Marks({data: data})
      ])
    )
  };

  window.App = App;
  window.rootElement = document.getElementById('root');
  document.title = 'World Map - Land';
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, d3, topojson, ipi);
