const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: "*",
      "Access-Control-Allow-Orgin": "*",
      "Acess-Control-Allow-Methods": "GET,POST,DELETE,PUT,OPTIONS",
      "Acess-Control-Allow-Headers":
        "Content-Type,Access-Control-Allow-Headers,x-test",
    })
  );
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   next();
  // });
};
