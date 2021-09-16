const Joi = require('joi');

const registerValidation = (req, res, next) => {
  // Create Schema
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,12}$')),
  });

  // Use Joi schema
  const { error } = schema.validate(req.body);

  if (error) {
    const errorKey = error.details[0].context.key;
    if (errorKey === 'username') {
      res.status(400);
      throw new Error('You must provided a username.');
    } else if (errorKey === 'email') {
      res.status(400);
      throw new Error('You must provided a valid email address.');
    } else if (errorKey === 'password') {
      res.status(400);
      throw new Error(
        'The password failed to match the requirements: 1. It must contain ONLY the following characters: lowercase, uppercase, numbers; 2. Must be between 6 and 12 characters'
      );
    } else {
      res.status(400);
      throw new Error('Invalid registration information.');
    }
  } else {
    next();
  }
};

const loginValidation = (req, res, next) => {
  // Create Schema
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // Use Joi schema
  const { error } = schema.validate(req.body);

  if (error) {
    const errorKey = error.details[0].context.key;
    if (errorKey === 'email') {
      res.status(400);
      throw new Error('You must provided a valid email address.');
    } else if (errorKey === 'password') {
      res.status(400);
      throw new Error('You have to provide password.');
    } else {
      res.status(400);
      throw new Error('Invalid registration information.');
    }
  } else {
    next();
  }
};

module.exports = { registerValidation, loginValidation };
