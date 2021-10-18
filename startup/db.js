const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://rama:rama@rk.ngyuh.mongodb.net/vidly?retryWrites=true&w=majority",
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
    .then(() => winston.info(" Connected to Db "))
    .catch((err) => console.log("not connected to Db", err));
};
