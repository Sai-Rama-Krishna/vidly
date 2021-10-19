const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
  // app.use(
  //   cors({
  //     origin: "*",
  //   })
  // );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
};
