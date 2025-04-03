import styled from "styled-components";
import { useEffect, useState } from "react";
import { North, Panorama, WorkspacePremium, Terminal, Api } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { lg, md } from "../../utils/responsive";
import { setNavState } from "../../redux/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { frontendSkills, backendSkills, softwareDevSkills } from "../../data";

const Container = styled.div``;

const Button = styled.div<{ $toggled: boolean }>`
  position: absolute;
  top: -10rem;
  right: -10rem;
  width: 20rem;
  height: 20rem;
  border-radius: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: var(--z-header);
  cursor: pointer;
  transition: 0.3s ease-in-out;

  background: ${({ $toggled }) => ($toggled ? "var(--clr-3)" : "var(--bg-color)")};
  transform: ${({ $toggled }) => ($toggled ? "scale(1.1) rotate(45deg)" : "rotate(45deg)")};
  box-shadow: ${({ $toggled }) =>
    $toggled ? "inset 0 0 2rem 1rem var(--shadow-color)" : "0 0 2rem 1rem var(--shadow-color)"};

  &:hover {
    box-shadow: ${({ $toggled }) =>
      $toggled ? "inset 0 0 3rem 2rem var(--shadow-color)" : "0 0 3rem 2rem var(--shadow-color)"};
  }

  ${md({
    top: "-6rem",
    right: "-6rem",
    width: "12rem",
    height: "12rem",
  })}
`;

const Title = styled.h1`
  margin: 1rem 0;
  letter-spacing: 2px;
  font-size: 2.5rem;

  ${md({
    fontSize: "1.75rem",
  })}
`;

const Content = styled.div<{ $toggled: boolean }>`
  position: absolute;
  top: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  right: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${lg(
    ({ $toggled }) =>
      $toggled && {
        top: "50%",
        left: "50%",
        right: "unset",
        transform: "translate(-50%, -50%)",
      }
  )}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 20rem;
  padding: 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  backdrop-filter: blur(20px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const Name = styled.h5`
  font-weight: 600;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const Info = styled.p``;

const SkillWrapper = styled.div`
  display: flex;
  align-items: center;
`;

function TopRight() {
  const [toggled, setToggled] = useState(false);
  const navState = useSelector((state: any) => state.navigation.toggled);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setNavState(toggled ? "" : "topRight"));
    setToggled(toggled ? false : true);
  };

  useEffect(() => {
    navState !== "topRight" && setToggled(false);
  }, [navState]);

  return (
    <Container>
      <Button $toggled={toggled} onClick={handleToggle}>
        {toggled && <North />}
        <Title>skills</Title>
      </Button>
      <Content $toggled={toggled}>
        <Card>
          <Header>
            <Panorama />
            <Name>Frontend Development</Name>
          </Header>
          {frontendSkills.map((skill) => (
            <InfoWrapper>
              <SkillWrapper>
                <WorkspacePremium />
                <Info>{skill.name}</Info>
              </SkillWrapper>
              <Box sx={{ width: 120, display: "flex", alignItems: "center" }}>
                <Rating value={skill.rating} readOnly precision={0.5} />
              </Box>
            </InfoWrapper>
          ))}
        </Card>
        <Card>
          <Header>
            <Terminal />
            <Name>Backend Development</Name>
          </Header>
          {backendSkills.map((skill) => (
            <InfoWrapper>
              <SkillWrapper>
                <WorkspacePremium />
                <Info>{skill.name}</Info>
              </SkillWrapper>
              <Box sx={{ width: 120, display: "flex", alignItems: "center" }}>
                <Rating value={skill.rating} readOnly precision={0.5} />
              </Box>
            </InfoWrapper>
          ))}
        </Card>
        <Card>
          <Header>
            <Api />
            <Name>Software Development</Name>
          </Header>
          {softwareDevSkills.map((skill) => (
            <InfoWrapper>
              <SkillWrapper>
                <WorkspacePremium />
                <Info>{skill.name}</Info>
              </SkillWrapper>
              <Box sx={{ width: 120, display: "flex", alignItems: "center" }}>
                <Rating value={skill.rating} readOnly precision={0.5} />
              </Box>
            </InfoWrapper>
          ))}
        </Card>
      </Content>
    </Container>
  );
}

export default TopRight;
