const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const auth = require("../routes/auth");
const users = require("../routes/user");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const error = require("../middleware/error");
const express = require("express");


module.exports = function (app) {

  app.get('/', async (req, res) => {
    return res.status(200).send('Hello Welcome to Vidly 🚀 ');
  });

  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
