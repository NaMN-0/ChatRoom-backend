import Joi from "@hapi/joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    name : Joi.string().min(6).required(),
    username : Joi.string().required(),
    password : Joi.string().min(6).required(),
    re_password : Joi.string().required(),
  });
  const validation = schema.validate(data);
  return validation;
}

export const loginValidation = (data) => {
  const schema = Joi.object({
    username : Joi.string().required(),
    password : Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
}