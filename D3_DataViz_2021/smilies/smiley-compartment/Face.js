import { BackgroundCircle } from './BackgroundCircle';
import { Eyes } from './Eyes';
import { Mouth } from './Mouth';
import { FaceContainer } from './FaceContainer';

export const Face = ({width, height, centerX, centerY, strokeWidth, eyeRadius, 
  eyeOffsetX, eyeOffsetY, mouthRadius, mouthWidth}) => (
  <FaceContainer
    width={width} 
    height={height} 
    centerX={centerX} 
    centerY={centerY}
  >
    <BackgroundCircle 
      radius={centerY - strokeWidth / 2} 
      strokeWidth={strokeWidth}
    />
    <Eyes 
      eyeRadius={eyeRadius} 
      eyeOffsetX={eyeOffsetX} 
      eyeOffsetY={eyeOffsetY}
    />
    <Mouth 
      mouthRadius={mouthRadius} 
      mouthWidth={mouthWidth}
    />
  </FaceContainer>
);