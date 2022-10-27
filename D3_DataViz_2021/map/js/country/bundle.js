(function (React$1, ReactDOM, d3, topojson, ipi) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  const jsonUrl = 'http://localhost:8080/SourceFiles/json/countries-50m.json';
  let it = 0;

  const useData = () => {
    const [data, setData] = ipi.useState({obj: 'data', state: null});
    if(it == 0) {
      it = 1;
      d3.json(jsonUrl).then(topology => {
        const { countries } = topology.objects;
        setData({obj: 'data', state: {
          countries: topojson.feature(topology, countries),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        }});
      });
    } else {
      it = 0;
    }

    return data;
  };

  const projection = d3.geoEqualEarth();
  const path = d3.geoPath(projection);

  const Marks = ({ data: {countries, interiors } }) => (
    React.createElement('g', {className: "marks"}, [
      React.createElement('path', {className: "sphere", d: path({ type: 'Sphere' })}),

        countries.features.map(feature => (
          React.createElement('path', {className: "country", d: path(feature)})
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
  document.title = 'World Map - Country';
  ReactDOM__default["default"].render(App(), window.rootElement);

})(React, ReactDOM, d3, topojson, ipi);
