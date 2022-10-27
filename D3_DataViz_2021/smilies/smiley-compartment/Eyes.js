export const Eyes = ({eyeRadius, eyeOffsetX, eyeOffsetY}) => (
  <g>
    <circle 
      r={eyeRadius} 
      cx={-eyeOffsetX} 
      cy={-eyeOffsetY} 
    />
    <circle 
      r={eyeRadius} 
      cx={eyeOffsetX} 
      cy={-eyeOffsetY} 
    />
  </g>
);