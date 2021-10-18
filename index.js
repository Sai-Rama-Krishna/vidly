const express = require("express");
const winston = require("winston");
const config = require("config");

const app = express();

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/logging")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
app.listen(port, () => winston.info(`Listening on port ${port}...`));
