import expertise from "pages/api/expertise";

export const fetchContactData = async () => {
  try {
    const response = await fetch("https://exertlogics.vercel.app/api/contact");
    const data = await response.json();
    if (data.status === "success" && data.contact.length > 0) {
      return { contactData: data.contact[0] };
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
  }
  return { contactData: null };
};

// load Navebar menu links
export const fetchMenus = async () => {
  try {
    const response = await fetch("https://exertlogics.vercel.app/api/header/");
    const data = await response.json();
    if (data.status === "success" && data.header.length > 0) {
      const menuList = data.header[0].links.map((link) => ({
        name: link.title,
        url: link.url,
        offset: 200,
      }));
      return { menuList };
    }
  } catch (error) {
    console.error("Error fetching menu:", error);
  }
  return { menuList: null };
};

// Load Navabar logo
export const fetchLogoData = async () => {
  try {
    const logoResponse = await fetch("https://exertlogics.vercel.app/api/logo/");
    const logoData = await logoResponse.json();
    if (logoData.status === "success" && logoData.logos.length > 0) {
      return { logoUrl: logoData.logos[0].logoLightUrl };
    }
  } catch (error) {
    console.error("Error fetching logo:", error);
  }
  return { logoUrl: null };
};

// Load Hero section data
export const fetchHomeData = async() => {
  try {
    const response = await fetch("https://exertlogics.vercel.app/api/home");
    const data = await response.json();
    if (data.status === "success" && data.home.length > 0) {
      return { homeData : data.home[0] };
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }
  return { homeData : null };
}

// Load About data 
export const fetchAboutData = async () => {
  try {
    const response = await fetch("https://exertlogics.vercel.app/api/about");
    const data = await response.json();
    if (data.status === "success" && data.about.length > 0) {
      return { aboutData : data.about[0]};
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }
  return { aboutData : null};
}

export const fetchServicesData = async() => {
    try {
      const response = await fetch("https://exertlogics.vercel.app/api/service/");
      const data = await response.json();
      if (data.status === "success") {
        const services = data.service.map((service) => ({
          title: capitalizeFirstLetterOfEachWord(service.title),
          desc: capitalizeFirstLetter(service.description),
          img: service.serviceBannerUrl,
        }));
        return { serviceData : services };
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
    }
    return { serviceData : null };
}

// Load expertise data
export const fetchExpertiseData = async() => {
    try {
      const response = await fetch("https://exertlogics.vercel.app/api/expertise");
      const data = await response.json();
      if (data.status === "success" && data.expertise.length > 0) {
        const exps = data.expertise[0];
         const expertiseList = [];
         for (let i = 0; i < exps.expertise.length; i += 3) {
          expertiseList.push(
             exps.expertise.slice(i, i + 3)
           );
         }
         return { expertiseData : {subTitle : exps.subTitle, description : exps.description, expertiseList}}
      }
    } catch (error) {
      console.error("Error fetching expertise data:", error);
  }
  return { expertiseData : null }
}

// Load categories and projects
export const fetchCategories = async () => {
  try {
    const response = await fetch("https://exertlogics.vercel.app/api/category");
    const data = await response.json();
    if (data.status === "success" && data.category.length > 0) {
        return { categoriesData : data.category }

    }
  } catch (error) {
    console.error("Error fetching about data:", error);
  }
  return { categoriesData : null }
};

export const fetchFooterData = async() => {
    try {
      const response = await fetch("https://exertlogics.vercel.app/api/footer");
      const data = await response.json();
      if (data.status === "success" && data.footer.length > 0) {
        return {footerData : data.footer[0]}

        // setSubTitle(footerData.subTitle);
        // setCopyrightText(footerData.copyrightText);

        // footerData.socialLinks.forEach((link) => {
        //   switch (link.type) {
        //     case "facebook":
        //       setFacebookUrl(link.url);
        //       break;
        //     case "twitter":
        //       setTwitterUrl(link.url);
        //       break;
        //     case "instagram":
        //       setInstagramUrl(link.url);
        //       break;
        //     case "linkedin":
        //       setLinkedinUrl(link.url);
        //       break;
        //     default:
        //       break;
        //   }
        // });
      }
    } catch (error) {
      console.error("Error fetching footer data:", error);
    }
    return {footerData : null};
  }

// helpers to capitalize
const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

 const capitalizeFirstLetter = (str) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
 };