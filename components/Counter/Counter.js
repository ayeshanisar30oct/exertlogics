import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTranslation } from "next-i18next";
import { useText } from "theme/common";
import useStyles from "./counter-style";

function Counter({employeesCount, projectsCount, clientsCount}) {

  const { t } = useTranslation("common");
  const { classes } = useStyles();
  const { classes: text } = useText();
  return (
    <div className={classes.counterWrap}>
      <Container fixed>
        <Grid
          container
          justify-content="center"
          alignItems="center"
          spacing={6}
        >
          <Grid md={4} item>
            <div className={classes.counterItem}>
              <div className={classes.text}>
                <Typography variant="h3" className={text.title}>
                  +{employeesCount}
                </Typography>
                <Typography component="p" className={text.subtitle}>
                  {t("agency-landing.about_employee")}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid md={4} item>
            <div className={classes.counterItem}>
              <div className={classes.text}>
                <Typography variant="h3" className={text.title}>
                  +{projectsCount}
                </Typography>
                <Typography component="p" className={text.subtitle}>
                  {t("agency-landing.about_projects")}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid md={4} item>
            <div className={classes.counterItem}>
              <div className={classes.text}>
                <Typography variant="h3" className={text.title}>
                  +{clientsCount}
                </Typography>
                <Typography component="p" className={text.subtitle}>
                  {t("agency-landing.about_client")}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Counter;
