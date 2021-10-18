const Joi = require("joi");
const { validate } = require("../models/genres");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
