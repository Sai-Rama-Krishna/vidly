const { users, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");
const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await users.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registerd");

  user = new users(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
