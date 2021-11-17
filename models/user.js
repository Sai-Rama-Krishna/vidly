const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
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
  isAdmin: Boolean,
  default: false,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
      name: this.name,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );

  return token;
};
const users = mongoose.model("users", userSchema);

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
