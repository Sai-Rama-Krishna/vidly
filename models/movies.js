const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const { genreSchema } = require("../models/genres");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 10,
    trim: true,
    required: true,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    rquired: true,
    min: 0,
    max: 10,
  },
  dailyRentalRate: {
    type: Number,
    rquired: true,
    min: 0,
    max: 10,
  },
});

const Movies = mongoose.model("Movies", movieSchema);

// validation function
function validatemovies(movie) {
  const schema = {
    title: Joi.string().min(3).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  };
  return Joi.validate(movie, schema);
}

exports.Movies = Movies;
exports.validate = validatemovies;
