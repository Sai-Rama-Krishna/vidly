const { users } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("invalid email or password");

  const validpassword = await dcrypt.compare(req.body.password, user.password);
  if (!validpassword) res.send(true);
});

function validate(req) {
  const schema = {
    password: Joi.string().min(5).max(200).required(),
    email: Joi.string().min(5).max(200).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
