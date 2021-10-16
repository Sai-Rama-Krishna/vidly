const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://rama:rama@rk.ngyuh.mongodb.net/vidly?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => winston.info(" Connected to Db listing 3000"))
    .catch((err) => console.log("not connected to Db", err));
};
