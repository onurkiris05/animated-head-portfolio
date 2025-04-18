import styled from "styled-components";
import ThemeModeToggler from "../components/ThemeModeToggler";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation/Navigation";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setNavState } from "../redux/navigationSlice";
import useOrientation from "../hooks/useOrientation";
import useMouseSector from "../hooks/useMouseSector";
import RadialDebug from "../components/RadialDebug";

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
  const isPortrait = useOrientation();
  useMouseSector(containerRef, isPortrait);

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

      {/* {process.env.NODE_ENV === "development" && <RadialDebug isPortrait={isPortrait} />} */}
    </Container>
  );
}

export default HomePage;
