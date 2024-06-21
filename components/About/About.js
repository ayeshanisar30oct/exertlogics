import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTranslation } from "next-i18next";
import { useText } from "theme/common";
import TitleDeco from "../Title/WithDecoration";
import useStyles from "./about-style";
import useTitle from "../Title/title-style";
import Counter from "../Counter";

function About() {
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
    const [backgroundImageUrl, setBackgroundImageUrl] = useState("");


   useEffect(() => {
     async function fetchAboutData() {
       try {
         const response = await fetch("http://localhost:3001/api/about");
         const data = await response.json();
         if (data.status === "success" && data.about.length > 0) {
           const aboutData = data.about[0];
           setSubTitle(capitalizeFirstLetter(aboutData.subTitle));
           setDescription(capitalizeFirstLetter(aboutData.description));
                     setBackgroundImageUrl(data.about[0].aboutBannerUrl);
         }
       } catch (error) {
         console.error("Error fetching home data:", error);
       }
     }

     fetchAboutData();
   }, []);

  // Theme breakpoints
  const theme = useTheme();
  const { classes: text } = useText();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  // Translation function
  const { t } = useTranslation("common");
  const { classes, cx } = useStyles({ backgroundImageUrl });
  const { classes: title } = useTitle();

 function capitalizeFirstLetter(text) {
   if (!text) return text;
   return text.charAt(0).toUpperCase() + text.slice(1);
 }

  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item md={5} xs={12}>
            <div>
              <TitleDeco text={t("agency-landing.about_title")} />
              {isDesktop && (
                <div className={classes.puzzle}>
                  <div className={classes.pieceBig}>
                    <span />
                  </div>
                  <div className={classes.pieceSmallTop}>
                    <span />
                  </div>
                  <div className={classes.pieceSmallBottom}>
                    <span />
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography
              className={cx(title.default, text.subtitle)}
              variant="h4"
            >
              {subTitle}
            </Typography>
            <Counter />
            <blockquote>{description}</blockquote>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default About;
