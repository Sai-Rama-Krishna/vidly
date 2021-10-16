const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          minlength: 3,
          maxlength: 50,
          required: true,
        },
        gold: {
          required: true,
          default: false,
          type: Boolean,
        },
        phone: {
          type: String,
          minlength: 3,
          maxlength: 50,
          required: true,
        },
      }),
      required: true,
    },

    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          minlength: 3,
          maxlength: 50,
          required: true,
          trim: true,
        },
        rent: {
          type: Number,
          required: true,
          min: 0,
          max: 255,
        },
      }),
      required: true,
    },
  })
);

function validaterental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validaterental;
