import styled from "styled-components";
import FaceAnimation from "./FaceAnimation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UpperTitle = styled.h5`
  font-size: 1.5rem;
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
`;

const LowerTitle = styled.p`
  font-size: 1.25rem;
`;

function Hero() {
  return (
    <Container>
      <UpperTitle>Hello I'm</UpperTitle>
      <Name>Onur Kiris</Name>
      <LowerTitle>Fullstack Developer</LowerTitle>
      <FaceAnimation />
    </Container>
  );
}

export default Hero;
