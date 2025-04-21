import styled from "styled-components";
import FaceAnimation from "./FaceAnimation";
import AnimatedText from "./AnimatedText";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out;
`;

const UpperTitle = styled.h5`
  font-size: 1.5rem;
`;

const Name = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  letter-spacing: 2px;
`;

function Hero() {
  return (
    <Container>
      <Header>
        <UpperTitle>Hello, I'm</UpperTitle>
        <Name>Onur Kiris</Name>
        <AnimatedText
          texts={["Full Stack Developer", "Software Developer (C#/Unity)", "Revit Modeler"]}
        />
      </Header>
      <FaceAnimation />
    </Container>
  );
}

export default Hero;
