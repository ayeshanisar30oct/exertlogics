
import { Redirect } from '../lib/redirect';
export default Redirect;

// import { Redirect } from '../lib/redirect';
// export default Redirect;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import {  makeStaticProps } from 'lib/getStatic';       //getStaticPaths,
import brand from 'public/text/brand';
import MainContainer from 'components/MainContainer';
import VideoBanner from 'components/VideoBanner';
import SquareParallax from 'components/Parallax/Square';
import About from 'components/About';
import Services from 'components/Services';
import Testimonials from 'components/Testimonials';
import Expertise from 'components/Expertise';
import CaseStudies from 'components/CaseStudies';
import CallAction from 'components/CallAction';
import MapAddress from 'components/MapAddress';
import PageNav from 'components/PageNav';
import Notification from 'components/Notification';

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles({ uniqId: 'home' })(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  spaceBottom: {
    marginBottom: theme.spacing(20),
    [theme.breakpoints.down('lg')]: {
      marginBottom: sectionMargin(6)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(10),
    }
  },
  spaceTop: {
    marginTop: theme.spacing(20),
    [theme.breakpoints.down('lg')]: {
      marginTop: sectionMargin(6)
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(10),
    }
  },
  spaceBottomShort: {
    marginBottom: theme.spacing(10),
  },
  spaceTopShort: {
    marginTop: theme.spacing(10),
  },
  containerWrap: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(10),
    },
    '& > section': {
      position: 'relative'
    }
  }
}));

function Landing(props) {
  const { classes } = useStyles();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { onToggleDark, onToggleDir, contactData, menuList, logoUrl, homeData, aboutData, serviceData, expertiseData, categoriesData,footerData } = props;
  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.agency.name + ' - Software Agency' }
        </title>
      </Head>
      <CssBaseline />
      <MainContainer
        onToggleDark={onToggleDark}
        onToggleDir={onToggleDir}
        menuList = { menuList }
        logoUrl = { logoUrl }
        footerData = { footerData }
      >
        <Fragment>
          <main className={classes.containerWrap}>
            <SquareParallax />
            <section id="home">
              <VideoBanner homeData = { homeData } />
            </section>
            <section className={isTablet ? classes.spaceTopShort : classes.spaceTop} id="about">
              <About aboutData = {aboutData} />
            </section>
            <section className={classes.spaceTop} id="services">
              <Services serviceData = {serviceData}/>
            </section>
            <section className={isTablet ? classes.spaceTopShort : classes.spaceTop} id="our-expertise">
              <Expertise  expertiseData = {expertiseData} />
            </section>
            <section className={isMobile ? classes.spaceTopShort : classes.spaceTop} id="testimonials">
              <Testimonials />
            </section>
            <section id="our-projects">
              <CaseStudies categoriesData = {categoriesData} />
            </section>
            <section className={classes.spaceTopShort} id="contact">
              <CallAction />
            </section>
            <section className={classes.spaceTopShort} id="address">
              <MapAddress contactData={contactData} />
            </section>
          </main>
          {!isTablet && (
            <PageNav />
          )}
          {!isTablet && (
            <Notification />
          )}
        </Fragment>
      </MainContainer>
    </React.Fragment>
  );
}

Landing.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  contactData: PropTypes.object,
  menuList: PropTypes.array,
  logoUrl: PropTypes.string,
  aboutData: PropTypes.object,
  footerData : PropTypes.object,
  serviceData: PropTypes.array,
  expertiseData: PropTypes.object,
  categoriesData: PropTypes.array,
};

export default Landing;

const getStaticProps = makeStaticProps(['common']);
export {  getStaticProps };

