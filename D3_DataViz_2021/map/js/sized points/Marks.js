import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1(); 
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ 
  worldAtlas: {land, interiors },
  cities, 
  sizeScale,
  sizeValue
}) => (
  <g className="marks">
    <path className="pSphere" d={path({ type: 'Sphere' })} />
    <path className="pGraticules" d={path(graticule())} />
    {
      land.features.map(feature => (
        <path className="pLand" d={path(feature)} />
      ))
    }
    <path className="pInteriors" d={path(interiors)} />
    {cities.map(d => {
      const [x, y] = projection([d.lng, d.lat]);
      return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />
    })}
  </g>
);