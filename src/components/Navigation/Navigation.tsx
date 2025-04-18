import styled from "styled-components";
import TopLeft from "./TopLeft";
import TopRight from "./TopRight";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";
import { useEffect, useState } from "react";

const Container = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
`;

function Navigation() {
  const [data, setData] = useState<any>(null);

  const accessKey = "$2a$10$xCQaSMn7nIqmWLHzMBG.ZeG0o5QmLpbqK1iL18bHyuuRhAr3Tf6S2";

  const fetchData = () => {
    fetch("https://api.jsonbin.io/v3/b/68020fb98a456b79668c0fec", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": accessKey,
      },
    })
      .then((res) => res.json())
      .then((apiData) => setData(apiData.record))
      .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      {data && (
        <>
          <TopLeft about={data.about} />
          <TopRight skills={data.skills} />
          <BottomLeft projects={data.projects} />
          <BottomRight experiences={data.experiences} />
        </>
      )}
    </Container>
  );
}

export default Navigation;
