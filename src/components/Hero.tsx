import styled from "styled-components";
import FaceAnimation from "./FaceAnimation";
import { lg } from "../utils/responsive";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div<{ $toggled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease-in-out;

  ${lg(
    ({ $toggled }) =>
      $toggled && {
        marginBottom: "7rem",
      }
  )}
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
  const navToggled = useSelector((state: any) => state.navigation.toggled);

  return (
    <Container>
      <Header $toggled={navToggled}>
        <UpperTitle>Hello I'm</UpperTitle>
        <Name>Onur Kiris</Name>
        <LowerTitle>Fullstack Developer</LowerTitle>
      </Header>
      <FaceAnimation />
    </Container>
  );
}

export default Hero;
