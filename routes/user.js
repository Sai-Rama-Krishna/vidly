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
  if (error) return res.status(400).send(error.details[0].message);

  let user = await users.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registerd");

  const salt = await bcrypt.genSalt(10);
  var password = await bcrypt.hash(req.body.password, salt);
  var obj = {
    name: req.body.name,
    email: req.body.email,
    password: password,
  };

  const token = user.generateAuthToken();
  // const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  var newuser = await new users(obj);
  await newuser.save();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));

  // res.send(" register sucess");
});

module.exports = router;
