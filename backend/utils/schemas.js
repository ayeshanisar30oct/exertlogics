import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "confirmPassword must match password",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const homeSchema = Joi.object({
  title: Joi.string().required(),
  subTitle: Joi.string().required(),
  videoUrl: Joi.string().required(),
});

const contactSchema = Joi.object({
  phone: Joi.string(),
  email: Joi.string(),
  address: Joi.string(),
});

const expertiseSchema = Joi.object({
  subTitle: Joi.string(),
  description: Joi.string(),
  expertise: Joi.array().items(Joi.string()),
});
const categorySchema = Joi.object({
  title: Joi.string(),
  projectId : Joi.string()
});
const projectSchema = Joi.object({
  categoryId : Joi.string().required(),
  title: Joi.string(),
  description: Joi.string(),
  logo: Joi.string(),
  background : Joi.string(),
});

const aboutSchema = Joi.object({
  subTitle: Joi.string(),
  description: Joi.string(),
  employeesCount: Joi.number(),
  clientsCount: Joi.number(),
  projectsCount: Joi.number(),
  aboutBannerUrl: Joi.string(),
});

const serviceSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  serviceBannerUrl: Joi.string(),
});

const logoSchema = Joi.object({
  logoLightUrl: Joi.string(),
  logoDarkUrl: Joi.string(),
  faviconUrl: Joi.string(),
});

const socialLinksSchema = Joi.object({
  url: Joi.string().required().messages({
    "string.base": '"url" should be a type of text',
    "string.empty": '"url" cannot be an empty field',
    "any.required": '"url" is a required field',
  }),
  type: Joi.string().required().messages({
    "string.base": '"type" should be a type of text',
    "string.empty": '"type" cannot be an empty field',
    "any.required": '"type" is a required field',
  }),
});

const footerSchema = Joi.object({
  subTitle: Joi.string().required(),
  copyrightText: Joi.string().required(),
  socialLinks: Joi.array().items(socialLinksSchema).messages({
    "array.base": '"links" should be an array of link objects',
  }),
});

const linkSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().required().messages({
    "string.base": '"title" should be a type of text',
    "string.empty": '"title" cannot be an empty field',
    "any.required": '"title" is a required field',
  }),
  url: Joi.string().required().messages({
    "string.base": '"url" should be a type of text',
    "string.empty": '"url" cannot be an empty field',
    "any.required": '"url" is a required field',
  }),
});

const headerSchema = Joi.object({
  id: Joi.string().messages({
    "string.base": '"id" should be a type of text',
    "string.empty": '"id" cannot be an empty field',
  }),
  siteTitle: Joi.string().required().messages({
    "string.base": '"siteTitle" should be a type of text',
    "string.empty": '"siteTitle" cannot be an empty field',
    "any.required": '"siteTitle" is a required field',
  }),
  links: Joi.array().items(linkSchema).messages({
    "array.base": '"links" should be an array of link objects',
  }),
});

export {
  registerSchema,
  loginSchema,
  headerSchema,
  homeSchema,
  logoSchema,
  footerSchema,
  aboutSchema,
  serviceSchema,
  expertiseSchema,
  categorySchema,
  projectSchema,
  contactSchema,
};
