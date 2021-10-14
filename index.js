const mongoose = require("mongoose");
const Joi = require("joi");
const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
Joi.objectId = require("joi-objectid")(Joi);
const users = require("./routes/user");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const error = require("./middleware/error");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
const config = require("config");

// process.on(" uncaughtException", (ex) => {
//   console.log("we got an uncaught exception");
//   winston.error(ex.messsage, ex);
// });

// process.on(" unhandledRejection", (ex) => {
//   console.log("we got an unhandled rejection");
//   winston.error(ex.messsage, ex);
// });

winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, {
  db: "mongodb+srv://rama:rama@rk.ngyuh.mongodb.net/vidly?retryWrites=true&w=majority",
});

// throw new Error("something failed");

// const p = Promise.reject(new Error(" Something failed ")).then(() =>
//   console.log("done")
// );

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwrPrivateKey is not defined");
  process.exit(1);
}
mongoose
  .connect(
    "mongodb+srv://rama:rama@rk.ngyuh.mongodb.net/vidly?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log(" Connected to Db listing 3000"))
  .catch((err) => console.log("not connected to Db", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.use(error);

app.listen(3000);
