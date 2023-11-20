const { objectIdValidation } = require(`../helpers/joi.helpers`);
const Joi = require("joi");
const userLoginOrSignup = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().min(4).required(),
});

const logout = Joi.object({
  userId: Joi.custom(objectIdValidation, "User ID Validation").required(),
});

module.exports = {
  logout,
  userLoginOrSignup,
};
