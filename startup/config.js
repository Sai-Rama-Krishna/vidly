const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    // console.error("FATAL ERROR: jwrPrivateKey is not defined");
    throw new Error("FATAL ERROR: jwrPrivateKey is not defined");
    process.exit(1);
  }
};
