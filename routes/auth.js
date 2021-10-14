const { users } = require("../models/user");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  try {
    let user = await users.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) return res.status(400).send("invalid email or password");

    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validpassword)
      return res.status(400).send("invalid email or password");

    const token = user.generateAuthToken();

    // const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");

    res.send(token);
  } catch (err) {
    console.log(err);
  }
});

function validate(req) {
  const schema = {
    password: Joi.string().min(5).max(200).required(),
    email: Joi.string().min(5).max(200).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
