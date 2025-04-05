import styled from "styled-components";
import { useEffect, useState } from "react";
import { South, Work, ArrowRight } from "@mui/icons-material";
import { lg, md, sm } from "../../utils/responsive";
import { setNavState } from "../../redux/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { experiences } from "../../data";

const Container = styled.div`
  pointer-events: auto;
`;

const Button = styled.div<{ $toggled: boolean }>`
  position: fixed;
  bottom: -10rem;
  right: -10rem;
  width: 20rem;
  height: 20rem;
  border-radius: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: var(--z-header);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background: center repeat var(--p-br) var(--clr-4);
  box-shadow: 10px 0 100px rgba(0, 0, 0, 0.5), 10px 0 100px rgba(0, 0, 0, 0.4),
    inset -5px -5px 30px rgba(0, 0, 0, 0.5), inset 5px 5px 15px rgba(255, 255, 255, 0.5);

  transform: ${({ $toggled }) => ($toggled ? "scale(1.1) rotate(-45deg)" : "rotate(-45deg)")};

  &:hover {
    box-shadow: 10px 0 100px rgba(0, 0, 0, 0.7), 10px 0 100px rgba(0, 0, 0, 0.5),
      inset -5px -5px 30px rgba(0, 0, 0, 0.7), inset 5px 5px 15px rgba(255, 255, 255, 0.5);
    transform: scale(1.1) rotate(-45deg);
  }

  ${md({
    bottom: "-5rem",
    right: "-5rem",
    width: "12rem",
    height: "12rem",
  })}
`;

const Title = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  color: #fff;

  ${md({
    fontSize: "1.75rem",
    marginTop: "1rem",
  })}
`;

const Content = styled.div<{ $toggled: boolean }>`
  position: absolute;
  bottom: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  right: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${lg(({ $toggled }) => ({
    bottom: $toggled ? "50%" : "-50rem",
    right: $toggled ? "50%" : "-50rem",
    transform: $toggled ? "translate(50%, 50%)" : "none",
  }))}

  ${sm(({ $toggled }) => ({
    bottom: $toggled ? "35%" : "-50rem",
    paddingBottom: $toggled ? "5rem" : "0",
  }))}
`;

const Card = styled.div<{ $toggled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40rem;
  min-width: 20rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  backdrop-filter: blur(50px);
  transition: 0.3s ease-in-out;

  ${md(
    ({ $toggled }) =>
      $toggled && {
        width: "90vw",
      }
  )}
`;

const Info = styled.p``;

const InfoBold = styled.p`
  font-weight: 600;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const List = styled.ul``;

const ListItem = styled.li`
  list-style: none;
  display: flex;
  align-items: flex-start;
`;

function BottomRight() {
  const [toggled, setToggled] = useState(false);
  const navState = useSelector((state: any) => state.navigation.toggled);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setNavState(toggled ? "" : "bottomRight"));
    setToggled(toggled ? false : true);
    document.body.style.overflowY = toggled ? "hidden" : "scroll";
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    navState !== "bottomRight" && setToggled(false);
  }, [navState]);

  return (
    <Container>
      <Button $toggled={toggled} onClick={handleToggle}>
        <Title>experience</Title>
        {toggled && <South style={{ color: "#fff" }} />}
      </Button>
      <Content $toggled={toggled}>
        {experiences.map((experience) => (
          <Card $toggled={toggled}>
            <TitleWrapper>
              <Work />
              <InfoBold>{experience.role}</InfoBold>
              <Info>{`- ${experience.company} (${experience.date})`}</Info>
            </TitleWrapper>
            <List>
              {experience.duties.map((duty) => (
                <ListItem>
                  <ArrowRight /> {duty}
                </ListItem>
              ))}
            </List>
          </Card>
        ))}
      </Content>
    </Container>
  );
}

export default BottomRight;
