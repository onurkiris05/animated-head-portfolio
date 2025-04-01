import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Sunny, NightsStay } from "@mui/icons-material";

const Button = styled.button`
  position: relative;
  background: lightgray;
  border: none;
  border-radius: 50rem;
  width: 5rem;
  height: 2.75rem;
`;

const Pin = styled.div<{ $themeMode: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${(props) =>
    props.$themeMode === "light" ? "translate(-90%, -50%)" : "translate(0%, -50%)"};
  border-radius: 50rem;
  transition: all 0.3s ease-in-out;
  display: flex;
  font-size: 2rem;
`;

const sunAnim = keyframes`
  0% {
    transform: rotate(0deg) 
  }
  100% {
    transform: rotate(360deg)
  }
`;

const Sun = styled(Sunny)`
  animation: ${sunAnim} 10s linear infinite;
`;

const nightAnim = keyframes`
  0% {
    transform: translateX( 0px);
  }
  50% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const Night = styled(NightsStay)`
  animation: ${nightAnim} 2s linear infinite;
`;

function ThemeModeToggler() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    themeMode === "dark"
      ? document.body.classList.add("dark-mode")
      : document.body.classList.remove("dark-mode");
    themeMode === "dark"
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
  }, [themeMode]);

  return (
    <Button onClick={() => setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"))}>
      <Pin $themeMode={themeMode}>
        {themeMode === "light" ? <Sun fontSize="inherit" /> : <Night fontSize="inherit" />}
      </Pin>
    </Button>
  );
}

export default ThemeModeToggler;
