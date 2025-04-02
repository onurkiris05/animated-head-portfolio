import styled, { keyframes } from "styled-components";

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
  return (
    <Container>
      <Face />
    </Container>
  );
}

export default FaceAnimation;
