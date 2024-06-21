import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useTranslation } from "next-i18next";
import { useText } from "theme/common";
import useStyles from "./counter-style";

function Counter() {

    const [employeesCount, setEmployeesCount] = useState("");
    const [projectsCount, setProjectsCount] = useState("");
    const [clientsCount, setClientsCount] = useState("");

     useEffect(() => {
       async function fetchAboutData() {
         try {
           const response = await fetch("http://localhost:3001/api/about");
           const data = await response.json();
           if (data.status === "success" && data.about.length > 0) {
             const aboutData = data.about[0];
             setEmployeesCount(aboutData.employeesCount);
             setProjectsCount(aboutData.projectsCount);
             setClientsCount(aboutData.clientsCount);
           }
         } catch (error) {
           console.error("Error fetching home data:", error);
         }
       }

       fetchAboutData();
     }, []);

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
