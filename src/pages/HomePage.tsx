import styled from "styled-components";
import ThemeModeToggler from "../components/ThemeModeToggler";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { setNavState } from "../redux/navigationSlice";
import { setSector } from "../redux/sectorSlice";
import { useEffect, useRef, useState } from "react";
import { getSectorByAngle, Sector } from "../utils/radialSector";
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
  const [currentSector, setCurrentSector] = useState<Sector | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== containerRef.current) return;
    dispatch(setNavState(""));
  };

  // Check if the screen is in portrait mode
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // Update the current sector based on the mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const sector = getSectorByAngle(cx, cy, e.clientX, e.clientY, isPortrait);

      if (sector && sector !== currentSector) {
        setCurrentSector(sector);
        dispatch(setSector(sector));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentSector, dispatch, isPortrait]);

  return (
    <Container ref={containerRef} onClick={handleClick}>
      <Hero />
      <Navigation />
      <ModeTogglerContainer>
        <ThemeModeToggler />
      </ModeTogglerContainer>

      {/* Visual debugging radial sectors for face animation directions */}
      {process.env.NODE_ENV === "development" && <RadialDebug isPortrait={isPortrait} />}
    </Container>
  );
}

export default HomePage;
