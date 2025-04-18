import styled from "styled-components";
import { useEffect, useState } from "react";
import { North, Panorama, WorkspacePremium, Terminal, Api } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { lg, md } from "../../utils/responsive";
import { setNavState } from "../../redux/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  pointer-events: auto;
`;

const Button = styled.div<{ $toggled: boolean }>`
  position: fixed;
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
  background: center repeat var(--p-tr) var(--clr-3);
  box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.5), 10px 10px 100px rgba(0, 0, 0, 0.4),
    inset 5px 5px 30px rgba(0, 0, 0, 0.7), inset -5px -5px 15px rgba(255, 255, 255, 0.5);

  transform: ${({ $toggled }) => ($toggled ? "scale(1.1) rotate(45deg)" : "rotate(45deg)")};

  &:hover {
    box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.7), 10px 10px 100px rgba(0, 0, 0, 0.5),
      inset 5px 5px 30px rgba(0, 0, 0, 0.7), inset -5px -5px 15px rgba(255, 255, 255, 0.5);
    transform: scale(1.1) rotate(45deg);
  }

  ${md({
    top: "-6rem",
    right: "-6rem",
    width: "12rem",
    height: "12rem",
  })}
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  letter-spacing: 2px;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;

  ${md({
    fontSize: "1.75rem",
    marginBottom: "1rem",
  })}
`;

const Content = styled.div<{ $toggled: boolean }>`
  position: absolute;
  top: ${({ $toggled }) => ($toggled ? "6rem" : "-50rem")};
  right: ${({ $toggled }) => ($toggled ? "12rem" : "-50rem")};
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${lg(
    ({ $toggled }) =>
      $toggled && {
        top: $toggled ? "50%" : "-50rem",
        right: $toggled ? "50%" : "-50rem",
        transform: $toggled ? "translate(50%, -50%)" : "none",
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
  backdrop-filter: blur(50px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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

interface TopRightProps {
  skills: Skills;
}

interface Skills {
  frontend: Skill[];
  backend: Skill[];
  software: Skill[];
}

interface Skill {
  name: string;
  rating: number;
}

function TopRight({ skills }: TopRightProps) {
  const [toggled, setToggled] = useState(false);
  const navState = useSelector((state: any) => state.navigation.toggled);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setNavState(toggled ? "" : "topRight"));
    setToggled(toggled ? false : true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    navState !== "topRight" && setToggled(false);
  }, [navState]);

  return (
    <Container>
      <Button $toggled={toggled} onClick={handleToggle}>
        {toggled && <North style={{ color: "#fff" }} />}
        <Title>skills</Title>
      </Button>
      <Content $toggled={toggled}>
        <Card>
          <Header>
            <Panorama />
            <Name>Frontend Development</Name>
          </Header>
          {skills.frontend.length &&
            skills.frontend.map((skill, i) => (
              <InfoWrapper key={i}>
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
          {skills.backend.length &&
            skills.backend.map((skill, i) => (
              <InfoWrapper key={i}>
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
          {skills.software.length &&
            skills.software.map((skill, i) => (
              <InfoWrapper key={i}>
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
