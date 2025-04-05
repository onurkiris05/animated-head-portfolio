import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  North,
  Link,
  AutoStories,
  RecordVoiceOver,
  SportsGymnastics,
  Hub,
  ConnectWithoutContact,
  LinkedIn,
  Email,
} from "@mui/icons-material";
import { lg, md } from "../../utils/responsive";
import { setNavState } from "../../redux/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  pointer-events: auto;
`;

const Button = styled.div<{ $toggled: boolean }>`
  position: fixed;
  top: -10rem;
  left: -10rem;
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
  background: center repeat var(--p-tl) var(--clr-5);
  box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.5), 10px 10px 100px rgba(0, 0, 0, 0.4),
    inset 5px 5px 30px rgba(0, 0, 0, 0.7), inset -5px -5px 15px rgba(255, 255, 255, 0.5);

  transform: ${({ $toggled }) => ($toggled ? "scale(1.1) rotate(-45deg)" : "rotate(-45deg)")};

  &:hover {
    box-shadow: 10px 10px 100px rgba(0, 0, 0, 0.7), 10px 10px 100px rgba(0, 0, 0, 0.5),
      inset 5px 5px 30px rgba(0, 0, 0, 0.7), inset -5px -5px 15px rgba(255, 255, 255, 0.5);
    transform: scale(1.1) rotate(-45deg);
  }

  ${md({
    top: "-6rem",
    left: "-6rem",
    width: "12rem",
    height: "12rem",
  })}
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  letter-spacing: 2px;
  font-size: 2rem;
  color: #fff;

  ${md({
    fontSize: "1.75rem",
    marginBottom: "1rem",
  })}
`;

const Content = styled.div<{ $toggled: boolean }>`
  position: absolute;
  top: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  left: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  transition: 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${lg(
    ({ $toggled }) =>
      $toggled && {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }
  )}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 25rem;
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
  margin-bottom: 0.25rem;
`;

const Name = styled.h5`
  font-weight: 600;
`;

const Info = styled.p``;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledLink = styled.a`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function TopLeft() {
  const [toggled, setToggled] = useState(false);
  const navState = useSelector((state: any) => state.navigation.toggled);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setNavState(toggled ? "" : "topLeft"));
    setToggled(toggled ? false : true);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    navState !== "topLeft" && setToggled(false);
  }, [navState]);

  return (
    <Container>
      <Button $toggled={toggled} onClick={handleToggle}>
        {toggled && <North style={{ color: "#fff" }} />}
        <Title>about</Title>
      </Button>
      <Content $toggled={toggled}>
        <Card>
          <Header>
            <AutoStories />
            <Name>Education</Name>
          </Header>
          <Info>AS in Computer Programming - Anadolu University</Info>
          <Info>BS in Business Administration - Anadolu University</Info>
        </Card>
        <Card>
          <Header>
            <RecordVoiceOver />
            <Name>Languages</Name>
          </Header>
          <Info>English - B2</Info>
          <Info>German - B1 (TELC)</Info>
          <Info>Turkish - Native </Info>
        </Card>
        <Card>
          <Header>
            <SportsGymnastics />
            <Name>Hobbies</Name>
          </Header>
          <Info>
            Camping, Hiking, Cycling, Swimming, Fantasy & Science Fiction (LOTR, Star Wars), Anime
            (Berserker), Games (XCom, Heroes)
          </Info>
        </Card>
        <Card>
          <Header>
            <Hub />
            <Name>Links</Name>
          </Header>
          <LinkWrapper>
            <Info>Github</Info>
            <Link />
            <StyledLink
              href="https://github.com/onurkiris05"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/onurkiris05
            </StyledLink>
          </LinkWrapper>
          <LinkWrapper>
            <Info>Articles</Info>
            <Link />
            <StyledLink
              href="https://medium.com/@onurkiris05"
              target="_blank"
              rel="noopener noreferrer"
            >
              medium.com/@onurkiris05
            </StyledLink>
          </LinkWrapper>
          <LinkWrapper>
            <Info>Game Portfolio</Info>
            <Link />
            <StyledLink
              href="https://www.behance.net/onurkiris"
              target="_blank"
              rel="noopener noreferrer"
            >
              behance.net/onurkiris
            </StyledLink>
          </LinkWrapper>
        </Card>
        <Card>
          <Header>
            <ConnectWithoutContact />
            <Name>Contact</Name>
          </Header>
          <LinkWrapper>
            <Info>LinkedIn</Info>
            <LinkedIn />
            <StyledLink
              href="https://www.linkedin.com/in/onur-kiris/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/onur-kiris
            </StyledLink>
          </LinkWrapper>
          <LinkWrapper>
            <Info>Email</Info>
            <Email />
            <StyledLink href="mailto:onurkiris05@gmail.com">onurkiris05@gmail.com</StyledLink>
          </LinkWrapper>
        </Card>
      </Content>
    </Container>
  );
}

export default TopLeft;
