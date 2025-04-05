import styled from "styled-components";
import ThemeModeToggler from "../components/ThemeModeToggler";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { setNavState } from "../redux/navigationSlice";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== containerRef.current) return;

    dispatch(setNavState(""));
  };

  return (
    <Container ref={containerRef} onClick={handleClick}>
      <Hero />
      <Navigation />
      <ModeTogglerContainer>
        <ThemeModeToggler />
      </ModeTogglerContainer>
    </Container>
  );
}

export default HomePage;
