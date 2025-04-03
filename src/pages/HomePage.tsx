import styled from "styled-components";
import ThemeModeToggler from "../components/ThemeModeToggler";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation/Navigation";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModeTogglerContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
`;

function HomePage() {
  return (
    <Container>
      <Hero />
      <Navigation />
      <ModeTogglerContainer>
        <ThemeModeToggler />
      </ModeTogglerContainer>
    </Container>
  );
}

export default HomePage;
