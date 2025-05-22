import Joi from "joi";
export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .allow(null)
    .optional(),
  age: Joi.number().integer().min(18).allow(null).optional(),
});
