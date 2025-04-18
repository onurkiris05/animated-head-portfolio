import styled from "styled-components";
import { useEffect, useState } from "react";
import { South, Work, ArrowRight } from "@mui/icons-material";
import { lg, md, sm } from "../../utils/responsive";
import { setNavState } from "../../redux/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  font-weight: 600;
  color: #fff;

  ${md({
    fontSize: "1.75rem",
    marginTop: "1rem",
  })}
`;

const Content = styled.div<{ $toggled: boolean }>`
  width: 40rem;
  height: 40rem;
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
    bottom: $toggled ? "45%" : "-50rem",
    paddingBottom: $toggled ? "5rem" : "0",
  }))}
`;

const Slider = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const SliderSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
`;

const Card = styled.div<{ $toggled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  min-width: 20rem;
  padding: 0.5rem 1rem;
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

const Info = styled.p`
  padding-right: 0.25rem;
`;

const InfoBold = styled.p`
  display: inline-block;
  font-weight: 600;
  padding: 0 0.25rem;
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

const Text = styled.p``;

const TextBold = styled.p`
  display: inline-block;
  font-weight: 600;
`;

interface Experience {
  role: string;
  company: string;
  date: string;
  responsibilities: string[];
}

interface BottomRightProps {
  experiences: Experience[];
}

function BottomRight({ experiences }: BottomRightProps) {
  const [toggled, setToggled] = useState(false);
  const navState = useSelector((state: any) => state.navigation.toggled);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(setNavState(toggled ? "" : "bottomRight"));
    setToggled(toggled ? false : true);
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
        <Slider
          direction="vertical"
          mousewheel={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
          }}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination, Mousewheel]}
        >
          {experiences.length &&
            experiences.map((experience, i) => (
              <SliderSlide key={i}>
                <Card $toggled={toggled}>
                  <TitleWrapper>
                    <Work />
                    <InfoBold>{experience.role}</InfoBold>
                    {experience.company && <Info> @ {experience.company}</Info>}
                    <Info>- ({experience.date})</Info>
                  </TitleWrapper>
                  <List>
                    {experience.responsibilities.length &&
                      experience.responsibilities.map((responsibility, i) => (
                        <ListItem key={i}>
                          <ArrowRight />
                          <Text>
                            {responsibility.split(/(\*\*.*?\*\*)/g).map((part, index) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return <TextBold key={index}>{part.slice(2, -2)}</TextBold>;
                              } else {
                                return <span key={index}>{part}</span>;
                              }
                            })}
                          </Text>
                        </ListItem>
                      ))}
                  </List>
                </Card>
              </SliderSlide>
            ))}
        </Slider>
      </Content>
    </Container>
  );
}

export default BottomRight;
