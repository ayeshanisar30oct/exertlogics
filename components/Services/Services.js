import React, { useEffect, useRef, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Carousel from "react-slick";
import PrevIcon from "@mui/icons-material/ArrowBack";
import NextIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "next-i18next";
import useStyles from "./services-style";
import TitleIcon from "../Title/WithIcon";
import Card from "../Cards/Default";
import DotsParallax from "../Parallax/Dots";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

function Services({ serviceData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation("common");
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const { classes } = useStyles();
  const slider = useRef(null);

  const [selectedService, setSelectedService] = useState(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (theme.direction === "ltr" && window.innerWidth > 1200) {
      const limit = window.innerWidth > 1400 ? 3 : 2;
      const lastSlide = Math.floor(serviceData.length - limit);
      slider.current.slickGoTo(lastSlide);
    }
  }, [theme.direction, serviceData.length]);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    onOpen();
  };

  useEffect(() => {
    if (isOpen) {
      // document.body.style.filter = "blur(5px)";
      document.body.style.filter = "none";
    } else {
      document.body.style.filter = "none";
    }

    return () => {
      document.body.style.filter = "none";
    };
  }, [isOpen]);

  return (
    <div className={classes.root}>
      <DotsParallax />
      <div className={classes.carouselHandle}>
        <div className={classes.carouselWrap}>
          <Carousel ref={slider} {...settings}>
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
            {serviceData &&
              serviceData.map((item, index) => (
                <div className={classes.item} key={index.toString()}>
                  <Card
                    title={item.title}
                    desc={item.desc}
                    img={item.img}
                    button="See Details"
                    onButtonClick={() => handleOpenModal(item)} // Pass the item data
                  />
                </div>
              ))}
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>
      <div className={classes.floatingTitle}>
        <Container fixed>
          <div className={classes.title}>
            <TitleIcon
              text={t("agency-landing.services_title")}
              icon="apps"
              extended
            />
            <nav className={classes.arrow}>
              <Fab
                size="small"
                onClick={() => slider.current.slickNext()}
                aria-label="prev"
                className={classes.margin}
              >
                <PrevIcon />
              </Fab>
              <Fab
                size="small"
                onClick={() => slider.current.slickPrev()}
                aria-label="next"
                className={classes.margin}
              >
                <NextIcon />
              </Fab>
            </nav>
          </div>
        </Container>
      </div>
      {selectedService && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="fixed inset-0 flex items-center justify-center service-modal">
            {(onClose) => (
              <div
                className="bg-white text-black p-4 rounded-lg shadow-lg"
                style={{
                  width: "33%",
                  boxShadow:
                    "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ModalHeader className="flex flex-col gap-1">
                  {selectedService.title}
                </ModalHeader>
                <ModalBody>
                  <p>{selectedService.desc}</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    className="text-white rounded-md"
                    color="primary"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}

export default Services;
