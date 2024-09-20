// import process.env.NEXT_PUBLIC_API_BASE_URL from "config";

export const fetchContactData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success" && data.contact.length > 0) {
      return { contactData: data.contact[0] };
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return { contactData: null };
  }
  // return { contactData: null };
};

// load Navbar menu links
export const fetchMenus = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/header`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
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
    return { menuList: null };
  }
  // return { menuList: null };
};

// Load Navbar logo
export const fetchLogoData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/logo`
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong!");

    }
    const logoData = await response.json();
    if (logoData.status === "success" && logoData.logos.length > 0) {
      return { logoUrl: logoData.logos[0].logoLightUrl };
    }
  } catch (error) {
    console.error("Error fetching logo:", error, process.env.NEXT_PUBLIC_API_BASE_URL + "/logo");
    return { logoUrl: null };
  }
};

// Load Hero section data
export const fetchHomeData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/home`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success" && data.home.length > 0) {
      return { homeData: data.home[0] };
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { homeData: null };
  }
};

// Load About data
export const fetchAboutData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success" && data.about.length > 0) {
      return { aboutData: data.about[0] };
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { aboutData: null };
  }
};

export const fetchServicesData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/service`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success") {
      const services = data.service.map((service) => ({
        title: capitalizeFirstLetterOfEachWord(service.title),
        desc: capitalizeFirstLetter(service.description),
        img: service.serviceBannerUrl,
      }));
      return { serviceData: services };
    }
  } catch (error) {
    console.error("Error fetching services data:", error);
    return { serviceData: null };
  }
};

// Load expertise data
export const fetchExpertiseData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/expertise`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success" && data.expertise.length > 0) {
      const exps = data.expertise[0];
      const expertiseList = [];
      for (let i = 0; i < exps.expertise.length; i += 3) {
        expertiseList.push(exps.expertise.slice(i, i + 3));
      }
      return {
        expertiseData: {
          subTitle: exps.subTitle,
          description: exps.description,
          expertiseList,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching expertise data:", error);
    return { expertiseData: null };
  }
};

// Load categories and projects
export const fetchCategories = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success" && data.category.length > 0) {
      return { categoriesData: data.category };
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categoriesData: null };
  }
};

export const fetchFooterData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/footer`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    if (data.status === "success" && data.footer.length > 0) {
      return { footerData: data.footer[0] };
    }
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return { footerData: null };
  }
};

// helpers to capitalize
const capitalizeFirstLetterOfEachWord = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
