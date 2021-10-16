const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb+srv://rama:rama@rk.ngyuh.mongodb.net/vidly?retryWrites=true&w=majority",
  // });

  const p = Promise.reject(new Error("something failed miserable"));
  p.then(() => console.log(" done"));
};
