const { Joi } = require("express-validation");

const register_schema = {
  body: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{5,30}/)
      .required(),
  }),
};

// const login_schema = {
//   body: Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string()
//       .regex(/[a-zA-Z0-9]{5,30}/)
//       .required(),
//   }),
// };

module.exports = {
  register_schema,
  // login_schema,
};
