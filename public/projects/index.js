import imgApi from "public/images/imgAPI";
export const transfromProjects = (projects) => {
    return [
        {
          bg: imgApi.agency[5],
          logo: projects[0].logoUrl, //"/images/logos/mobile.png",
          title:projects[0].title, //"Donec commodo convallis ligula",
          desc: projects[0].description,                   //"Vestibulum consequat hendrerit",
          size: "small",
        },
        {
          logo: projects[1].logoUrl, //"/images/logos/mobile.png",
          title:projects[1].title, //"Donec commodo convallis ligula",
          desc: projects[1].description,
          size: "small",
          simple: true,
        },
        {
          logo: projects[2].logoUrl, //"/images/logos/mobile.png",
          title:projects[2].title, //"Donec commodo convallis ligula",
          desc: projects[2].description,
          size: "medium",
          simple: true,
        },
        {
          bg: imgApi.agency[6],
          logo: projects[3].logoUrl, //"/images/logos/mobile.png",
          title:projects[3].title, //"Donec commodo convallis ligula",
          desc: projects[3].description,
          size: "medium",
        },
        {
          bg: imgApi.agency[7],
          logo: projects[4].logoUrl, //"/images/logos/mobile.png",
          title:projects[4].title, //"Donec commodo convallis ligula",
          desc: projects[4].description,
          size: "medium",
        },
        {
          bg: imgApi.agency[8],
          logo: projects[5].logoUrl, //"/images/logos/mobile.png",
          title:projects[5].title, //"Donec commodo convallis ligula",
          desc: projects[5].description,
          size: "big",
        },
        {
          bg: imgApi.agency[9],
          logo: projects[6].logoUrl, //"/images/logos/mobile.png",
          title:projects[6].title, //"Donec commodo convallis ligula",
          desc: projects[6].description,
          size: "big",
        },
      ];
}