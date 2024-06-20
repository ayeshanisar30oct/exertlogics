import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import { useTranslation } from "next-i18next";
// import logo from '/public/images/el-logo.png';
import logoPlaceholder from "public/images/el-logo.png"; // Placeholder in case of a failed fetch

import brand from "public/text/brand";
import { useTextAlign } from "theme/common";
import useStyles from "./footer-style";
import SelectLang from "../LangSwitch/Select";

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.agency.footerText}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
    link: ["#team", "#history", "#contact-us", "#locations"],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
    link: [
      "#resource",
      "#resource-name",
      "#another-resource",
      "#final-resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
    link: ["#privacy-policy", "#terms-of-use"],
  },
];

function Footer(props) {
  const [subTitle, setSubTitle] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState(logoPlaceholder);

  useEffect(() => {
    async function fetchLogoData() {
      try {
        const logoResponse = await fetch("http://localhost:3001/api/logo/");
        const logoData = await logoResponse.json();
        if (logoData.status === "success" && logoData.logos.length > 0) {
          setLogoUrl(logoData.logos[0].logoLightUrl);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    }
    fetchLogoData();
  }, []);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await fetch("http://localhost:3001/api/footer");
        const data = await response.json();
        if (data.status === "success" && data.footer.length > 0) {
          const footerData = data.footer[0];
          setSubTitle(footerData.subTitle);
          setCopyrightText(footerData.copyrightText);

          footerData.socialLinks.forEach((link) => {
            switch (link.type) {
              case "facebook":
                setFacebookUrl(link.url);
                break;
              case "twitter":
                setTwitterUrl(link.url);
                break;
              case "instagram":
                setInstagramUrl(link.url);
                break;
              case "linkedin":
                setLinkedinUrl(link.url);
                break;
              default:
                break;
            }
          });
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    }

    fetchFooterData();
  }, []);

  const { toggleDir } = props;
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Translation Function
  const { t } = useTranslation("common");

  const { classes } = useStyles();
  const { classes: align } = useTextAlign();

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <div className={classes.logo}>
            <img src={logoUrl} alt="logo" />
            <Typography variant="h6" color="textPrimary">
              {brand.agency.projectName}
            </Typography>
          </div>
          <Typography
            color="textPrimary"
            className={classes.footerDesc}
            gutterBottom
          >
            {subTitle}
          </Typography>
          {isDesktop && (
            <Typography className={classes.copyrightText}>
              {copyrightText}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4} justify-content="space-evenly">
            {footers.map((footer) => (
              <Grid
                item
                xs={12}
                md={3}
                key={footer.title}
                className={classes.siteMapItem}
              >
                {isDesktop && (
                  <div>
                    <Typography
                      variant="h6"
                      className={classes.title}
                      color="textPrimary"
                      gutterBottom
                    >
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item, index) => (
                        <li key={item}>
                          <Link
                            href={footer.link[index]}
                            variant="subtitle1"
                            color="textSecondary"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <Accordion
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className={classes.accordionIcon} />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>{footer.title}</strong>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <Link
                              href={footer.link[index]}
                              variant="subtitle1"
                              color="textSecondary"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.socmed}>
            <IconButton aria-label="FB" className={classes.margin} size="small">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
                <i className="ion-logo-facebook" />
              </a>
            </IconButton>
            <IconButton aria-label="TW" className={classes.margin} size="small">
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
                <i className="ion-logo-twitter" />
              </a>
            </IconButton>
            <IconButton aria-label="IG" className={classes.margin} size="small">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <i className="ion-logo-instagram" />
              </a>
            </IconButton>
            <IconButton aria-label="LI" className={classes.margin} size="small">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                <i className="ion-logo-linkedin" />
              </a>
            </IconButton>
          </div>
          <SelectLang toggleDir={toggleDir} />
        </Grid>
      </Grid>
      {isMobile && (
        <div className={`${align.textCenter} ${classes.copyrightText}`}>
          <Box p={4}>{copyrightText}</Box>
        </div>
      )}
    </Container>
  );
}

Footer.propTypes = {
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  toggleDir: () => {},
};

export default Footer;
