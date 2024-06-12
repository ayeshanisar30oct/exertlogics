import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'confirmPassword must match password',
  }),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});


const linkSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': '"title" should be a type of text',
    'string.empty': '"title" cannot be an empty field',
    'any.required': '"title" is a required field',
  }),
  url: Joi.string().required().messages({
    'string.base': '"url" should be a type of text',
    'string.empty': '"url" cannot be an empty field',
    'any.required': '"url" is a required field',
  }),
});

const navBarSchema = Joi.object({
  id: Joi.string().messages({
    'string.base': '"id" should be a type of text',
    'string.empty': '"id" cannot be an empty field',
  }),
  logo: Joi.string().uri().required().messages({
    'string.base': '"logo" should be a type of text',
    'string.empty': '"logo" cannot be an empty field',
    'string.uri': '"logo" must be a valid URI',
    'any.required': '"logo" is a required field',
  }),
  siteTitle: Joi.string().required().messages({
    'string.base': '"siteTitle" should be a type of text',
    'string.empty': '"siteTitle" cannot be an empty field',
    'any.required': '"siteTitle" is a required field',
  }),
  links: Joi.array().items(linkSchema).messages({
    'array.base': '"links" should be an array of link objects',
  }),
});


export { registerSchema, loginSchema, navBarSchema };
