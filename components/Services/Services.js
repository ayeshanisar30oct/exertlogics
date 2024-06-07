import React, { useEffect, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Carousel from 'react-slick';
import PrevIcon from '@mui/icons-material/ArrowBack';
import NextIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'next-i18next';
import imgApi from 'public/images/imgAPI';
import useStyles from './services-style';
import TitleIcon from '../Title/WithIcon';
import Card from '../Cards/Default';
import DotsParallax from '../Parallax/Dots';

const servicesList = [
  {
    title: 'UI/UX Designing',
    desc: 'The design of your web/mobile app is the first impression of your business. Our highly professional designers will assure you of the impressive outlook of the website/app.',
    img: imgApi.agency[2],
  },
  {
    title: 'Mobile Development',
    desc: 'We have a team of experienced and dedicated mobile app developers who can create a custom app for you, according to your specific requirements.',
    img: imgApi.agency[3],
  },
  {
    title: 'Web Development',
    desc: 'We have a team of highly experienced developers who can develop a perfect web solution for clients. Our team is always up to date with the latest technologies so that we can provide our clients with the best!',
    img: imgApi.agency[4],
  },
  {
    title: 'Marketing | SEO | SEM',
    desc: 'As marketing has a trivial role in the success of any business. Exertlogics can provide you with great SEO services while staying within the policies of the major search engines.',
    img: imgApi.agency[2],
  },
  {
    title: 'Data Sciences',
    desc: 'The key to the quality and success of your web App/website is how your data is managed and optimized. We at Exertlogics can provide you with the best solution for your data design.',
    img: imgApi.agency[3],
  },
  {
    title: 'E-Commerce Solutions',
    desc: 'We provide the best e-commerce solutions for your business with scalable solutions and simplified ordering processes and seamless payment methods.',
    img: imgApi.agency[4],
  },
];

function Services() {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { classes } = useStyles();
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
      }
    }, {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      }
    }]
  };

  useEffect(() => {
    if (theme.direction === 'ltr' && window.innerWidth > 1200) {
      const limit = window.innerWidth > 1400 ? 3 : 2;
      const lastSlide = Math.floor(servicesList.length - limit);
      slider.current.slickGoTo(lastSlide);
    }
  }, []);

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
            {servicesList.map((item, index) => (
              <div className={classes.item} key={index.toString()}>
                <Card
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                  button={t('agency-landing.services_button')}
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
            <TitleIcon text={t('agency-landing.services_title')} icon='apps' extended />
            <nav className={classes.arrow}>
              <Fab size='small' onClick={() => slider.current.slickNext()} aria-label='prev' className={classes.margin}>
                <PrevIcon />
              </Fab>
              <Fab size='small' onClick={() => slider.current.slickPrev()} aria-label='next' className={classes.margin}>
                <NextIcon />
              </Fab>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Services;
