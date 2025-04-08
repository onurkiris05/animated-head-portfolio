import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useImageAnimator } from "../hooks/useImageAnimator";

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

const Face = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background: center/contain no-repeat var(${(props) => props.image});
  animation: ${hoverAnim} 3s ease-in-out infinite;
  transition: 0.1s;
`;

function FaceAnimation() {
  const currentSector = useSelector((state: any) => state.sector.state);
  const currentImage = useImageAnimator(currentSector, 50);

  return (
    <Container>
      <Face image={currentImage} />
    </Container>
  );
}

export default FaceAnimation;
