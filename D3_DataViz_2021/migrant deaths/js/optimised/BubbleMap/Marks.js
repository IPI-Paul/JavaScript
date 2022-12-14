import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1(); 
const path = geoPath(projection);
const graticule = geoGraticule();
let landMarks;

export const Marks = ({ 
  worldAtlas: {land, interiors },
  migrants, 
  sizeScale,
  sizeValue
}) => (
  <g className="marks">
    {
      landMarks = landMarks ? landMarks : <g>
          <path className="pSphere" d={path({ type: 'Sphere' })} />
          <path className="pGraticules" d={path(graticule())} />
          {
            land.features.map(feature => (
              <path className="pLand" d={path(feature)} />
            ))
          }
          <path className="pInteriors" d={path(interiors)} />
        </g>
    }
    {migrants.map(d => {
      const [x, y] = projection(d.coords);
      return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} />
    })}
  </g>
);
