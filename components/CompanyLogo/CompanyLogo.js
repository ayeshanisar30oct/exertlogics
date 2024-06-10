import React from 'react';
import useStyles from './logo-style';

const logos = [
  "/images/logos/architect.png",
  "/images/logos/cloud.png",
  "/images/logos/coin.png",
  "/images/logos/mobile.png",
  "/images/logos/profile.png",
  "/images/logos/saas.png",
  // "/images/logos/alanPits-logo.png",
  // "/images/logos/bellsOfSteal-logo.webp",
  // "/images/logos/cannanine-logo-300x52.webp",
  // "/images/logos/heritageSigns-logo.png",
  // "/images/logos/iHeartCats-logo-300x84.webp",
  // "/images/logos/iHeartDogs-logo_1.webp",
  // "/images/logos/images.pngp",
  // "/images/logos/statCareers-logo-300x103.png",
];

function CompanyLogo() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        {logos.map((logo, index) => (
          <img src={logo} alt={'logo' + index.toString()} key={index.toString()} />
        ))}
      </div>
    </div>
  );
}

export default CompanyLogo;
