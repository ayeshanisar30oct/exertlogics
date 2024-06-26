import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ScrollAnimation from "react-scroll-animation-wrapper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/LocalPhone";
import LocationIcon from "@mui/icons-material/LocationOn";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react18";
import { useTranslation } from "next-i18next";
import useStyles from "./map-address-style";
import TitleDeco from "../Title/WithDecoration";

function MapContainer(props) {
  const { google } = props;
 

  return (
    <Map
      google={google}
      style={{ width: "100%", height: "700px", position: "relative" }}
      initialCenter={{
        lat: 37.759703,
        lng: -122.428093,
      }}
      zoom={14}
    >
      <Marker position={{ lat: 37.759703, lng: -122.428093 }} />
    </Map>
  );
}

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
};

const MapWithAMarker = GoogleApiWrapper({ apiKey: null })(MapContainer);

function MapAdress() {

   const [phoneData, setPhoneData] = useState("");
   const [emailData, setEmailData] = useState("");
   const [addressData, setAddressData] = useState("");


     const fetchContactData = async () => {
       try {
         const response = await fetch("http://localhost:3001/api/contact");
         const data = await response.json();
         if (data.status === "success" && data.contact.length > 0) {
           const contactData = data.contact[0];
           setPhoneData(contactData.phone);
           setEmailData(contactData.email);
           setAddressData(contactData.address);
         }
       } catch (error) {
         console.error("Error fetching contact data:", error);
       }
     }

     useEffect(() => {
       fetchContactData();
     }, []);


  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Translation Function
  const { t } = useTranslation("common");
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          {isDesktop && <Grid item md={1} />}
          <Grid item md={isDesktop ? 5 : 6} xs={12}>
            <TitleDeco text={t("agency-landing.office_title")} />
            <div className={classes.block}>
              <ScrollAnimation
                animateOnce
                animateIn="fadeInLeftShort"
                offset={-100}
                delay={200}
                duration={0.3}
              >
                <Paper className={classes.paper}>
                  <Typography variant="h6" display="block">
                    {t("agency-landing.office_head")}
                  </Typography>
                  <Grid container>
                    <Grid item sm={6} xs={12}>
                      <PhoneIcon className={classes.icon} />
                      {phoneData}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <EmailIcon className={classes.icon} />
                      {emailData}
                    </Grid>
                    <Grid item xs={12}>
                      <LocationIcon className={classes.icon} />
                      {addressData}
                    </Grid>
                  </Grid>
                </Paper>
              </ScrollAnimation>
              <ScrollAnimation
                animateOnce
                animateIn="fadeInLeftShort"
                offset={-100}
                delay={500}
                duration={0.3}
              >
                {/* <Paper className={classes.paper}>
                  <Typography variant="h6" display="block">
                    {t('agency-landing.office_branch')}
                  </Typography>
                  <Grid container>
                    <Grid item sm={6} xs={12}>
                      <PhoneIcon className={classes.icon} />
                      +98 765 432 10
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <EmailIcon className={classes.icon} />
                      hello@luxi.com
                    </Grid>
                    <Grid item xs={12}>
                      <LocationIcon className={classes.icon} />
                      Lorem ipsum street Block C - Vestibullum Building
                    </Grid>
                  </Grid>
                </Paper> */}
              </ScrollAnimation>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <Paper className={classes.map} elevation={10}>
              <MapWithAMarker
                googleMapURL="https://maps.app.goo.gl/mW5jmZG53KPGxhyV6"
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "700px" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default MapAdress;
