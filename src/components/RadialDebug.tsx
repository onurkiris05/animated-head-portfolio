import styled from "styled-components";
import { angleConfigs } from "../utils/radialSector";

const DebugContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const Line = styled.div<{ angle: number }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background-color: red;
  transform-origin: center;
  transform: rotate(${(props) => props.angle}deg) translateY(-50%);
`;

const CenterCircle = styled.div<{ radius: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  border-radius: 50%;
  border: 2px dashed red;
  transform: translate(-50%, -50%);
`;

const RadialDebug = ({ isPortrait }: { isPortrait: boolean }) => {
  const config = isPortrait ? angleConfigs.portrait : angleConfigs.landscape;
  const offset = isPortrait ? 45 : 10;

  return (
    <DebugContainer>
      {config.sectorAngles.map((angle, index) => (
        <Line key={index} angle={angle + offset + config.baseAngle} />
      ))}

      <CenterCircle radius={config.centerOffsetRadius} />
    </DebugContainer>
  );
};

export default RadialDebug;
