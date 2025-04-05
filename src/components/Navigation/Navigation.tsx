import styled from "styled-components";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";

const Container = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;

function Navigation() {
  return (
    <Container>
      <TopLeft />
      <TopRight />
      <BottomLeft />
      <BottomRight />
    </Container>
  );
}

export default Navigation;
