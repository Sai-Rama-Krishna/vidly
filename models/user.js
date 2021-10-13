const mongoose = require("mongoose");
const Joi = require("joi");

const users = mongoose.model(
  "users",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 200,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      maxlength: 200,
      required: true,
      unique: true,
    },
  })
);

// validation function
function validateuser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(200).required(),
    email: Joi.string().min(5).max(200).required(),
  };
  return Joi.validate(user, schema);
}

exports.users = users;
exports.validate = validateuser;
