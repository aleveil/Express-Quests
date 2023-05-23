const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.string().max(255).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().required(),
});

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255),
  language: Joi.string().max(255),
});

function validateMovie(req, res, next) {
  const movie = req.body;
  const { error } = movieSchema.validate(movie, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

function validateUser(req, res, next) {
  const user = req.body;
  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

module.exports = {
  validateMovie,
  validateUser,
};
