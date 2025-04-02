import styled from "styled-components";
import { useState } from "react";

const Container = styled.div<{ toggled: boolean }>`
  position: absolute;
  top: -10rem;
  left: -10rem;
  width: 20rem;
  height: 20rem;
  border-radius: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  background: ${({ toggled }) => (toggled ? "var(--clr-5)" : "var(--bg-color)")};
  transform: ${({ toggled }) => (toggled ? "scale(1.1) rotate(-45deg)" : "rotate(-45deg)")};
  box-shadow: ${({ toggled }) =>
    toggled ? "inset 0 0 2rem 1rem rgba(0, 0, 0, 0.3)" : "0 0 2rem 1rem rgba(0, 0, 0, 0.3)"};

  &:hover {
    transform: scale(1.1) rotate(-45deg);
    background: var(--clr-5);
  }
`;

const Title = styled.h1`
  margin: 1rem 0;
`;

function TopLeft() {
  const [toggled, setToggled] = useState(false);

  return (
    <Container toggled={toggled} onClick={() => setToggled(!toggled)}>
      <Title>TopLeft</Title>
    </Container>
  );
}

export default TopLeft;
