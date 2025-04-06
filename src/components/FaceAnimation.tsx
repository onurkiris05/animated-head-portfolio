import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { Sector } from "../utils/radialSector";

const Container = styled.div`
  width: 40rem;
  height: 40rem;
`;

const hoverAnim = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Face = styled.div`
  width: 100%;
  height: 100%;
  background: center/cover no-repeat var(--tl-1);
  animation: ${hoverAnim} 3s ease-in-out infinite;
`;

function FaceAnimation() {
  const sector: Sector = useSelector((state: any) => state.sector.state);

  console.log("sector", sector);

  return (
    <Container>
      <Face />
    </Container>
  );
}

export default FaceAnimation;
