const express = require('express');
// const winston = require("winston");
const config = require('config');

const app = express();

require('./startup/db')();
require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`));
app.listen(port, () => console.log(`Listening on port ${port}...`));
// const port = config.get("PORT") || 5000;
// app.listen(port, () => winston.info(`Listening on port ${port}...`));
