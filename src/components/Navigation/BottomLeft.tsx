import styled from "styled-components";
import { useEffect, useState } from "react";
import { South } from "@mui/icons-material";
import { lg, md, sm } from "../../utils/responsive";
import { setNavState } from "../../redux/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import { projects, borderPatterns, borderColors } from "../../data";

const Container = styled.div`
  pointer-events: auto;
`;

const Button = styled.div<{ $toggled: boolean }>`
  position: fixed;
  bottom: -10rem;
  left: -10rem;
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
  background: center repeat var(--p-bl) var(--clr-2);
  box-shadow: 10px 0 100px rgba(0, 0, 0, 0.5), 10px 0 100px rgba(0, 0, 0, 0.4),
    inset 0 -5px 30px rgba(0, 0, 0, 0.7), inset 0 5px 15px rgba(255, 255, 255, 0.5);

  transform: ${({ $toggled }) => ($toggled ? "scale(1.1) rotate(45deg)" : "rotate(45deg)")};

  &:hover {
    box-shadow: 10px 0 100px rgba(0, 0, 0, 0.7), 10px 0 100px rgba(0, 0, 0, 0.5),
      inset 0 -5px 30px rgba(0, 0, 0, 0.7), inset 0 5px 15px rgba(255, 255, 255, 0.5);
    transform: scale(1.1) rotate(45deg);
  }

  ${md({
    bottom: "-5rem",
    left: "-5rem",
    width: "12rem",
    height: "12rem",
  })}
`;

const Title = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #fff;

  ${md({
    fontSize: "1.75rem",
    marginTop: "1rem",
  })}
`;

const Content = styled.div<{ $toggled: boolean }>`
  position: absolute;
  bottom: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  left: ${({ $toggled }) => ($toggled ? "8rem" : "-50rem")};
  transition: 0.5s ease-in-out;
  width: 40rem;
  height: 40rem;

  ${lg(({ $toggled }) => ({
    bottom: $toggled ? "50%" : "-50rem",
    left: $toggled ? "50%" : "-50rem",
    transform: $toggled ? "translate(-50%, 50%)" : "none",
  }))}

  ${md(
    ({ $toggled }) =>
      $toggled && {
        width: "90vw",
      }
  )}

  ${sm(({ $toggled }) => ({
    bottom: $toggled ? "40%" : "-50rem",
    paddingBottom: $toggled ? "5rem" : "0",
  }))}
`;

const Slider = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const SliderSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Frame = styled.div<{ $bPattern: string; $bColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 20px solid red;
  border-image: ${({ $bPattern }) => `url(${$bPattern}) 20 round`};
  background-color: ${({ $bColor }) => `${$bColor}`};
`;

const SlideContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.25rem;
`;

const SlideTitle = styled.h3`
  font-size: 1.5rem;
  text-align: center;
  color: var(--text-color);
`;

const StyledLink = styled.a`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--bg-color);

  &:hover {
    transform: scale(1.1);
  }
`;

function BottomLeft() {
  const [toggled, setToggled] = useState(false);
  const navState = useSelector((state: any) => state.navigation.toggled);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setNavState(toggled ? "" : "bottomLeft"));
    setToggled(toggled ? false : true);
  };

  useEffect(() => {
    navState !== "bottomLeft" && setToggled(false);
  }, [navState]);

  return (
    <Container>
      <Button $toggled={toggled} onClick={handleToggle}>
        <Title>projects</Title>
        {toggled && <South style={{ color: "#fff" }} />}
      </Button>
      <Content $toggled={toggled}>
        <Slider direction="vertical" effect={"cards"} grabCursor={true} modules={[EffectCards]}>
          {projects.length &&
            projects.map((project, i) => (
              <SliderSlide key={i}>
                <Frame
                  $bPattern={borderPatterns[i % borderPatterns.length]}
                  $bColor={borderColors[i % borderColors.length]}
                >
                  <SlideContent>
                    <Slider
                      spaceBetween={50}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      modules={[Pagination]}
                      loop={true}
                    >
                      {project.screenShots.length &&
                        project.screenShots.map((ss, i) => (
                          <SliderSlide key={i}>
                            <Image src={ss} />
                          </SliderSlide>
                        ))}
                    </Slider>
                    <Header>
                      <StyledLink href={project.live} target="_blank" rel="noopener noreferrer">
                        Demo
                      </StyledLink>
                      <SlideTitle>{project.name}</SlideTitle>
                      <StyledLink href={project.github} target="_blank" rel="noopener noreferrer">
                        Github
                      </StyledLink>
                    </Header>
                  </SlideContent>
                </Frame>
              </SliderSlide>
            ))}
        </Slider>
      </Content>
    </Container>
  );
}

export default BottomLeft;
