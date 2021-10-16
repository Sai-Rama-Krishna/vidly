const express = require("express");

const app = express();

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/logging");
require("./startup/config");
require("./startup/validation");

app.listen(3000);
