const { users, validate } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await users.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already registerd");

  user = new users(_.pick(req.body, ["name", "email", "password"]));
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
