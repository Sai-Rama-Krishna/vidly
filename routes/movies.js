/** @format */

const express = require("express");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const router = express.Router();
const { Genres } = require("../models/genres");
const { Movies, validate } = require("../models/movies");
const { ObjectID } = require("mongodb");
router.get("/", async (req, res) => {
  const movie = await Movies.find().sort("name");
  res.send(movie);
});

router.get("/:id", async (req, res) => {
  try {
    console.log('id---',req.params.id);
    const movie = await Movies.findOne({ _id: new ObjectID(req.params.id) });

    if (!movie) return res.status(404).send("not avalabile");
    res.send(movie);
  } catch (err) {
    console.log(err);
  }
});

//post

router.post("/", [auth], async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genres.find({ _id: new ObjectID(req.body.genreId) });
    if (!genre) return res.status(400).send("invalid genre");
    var obj = {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    };

    const movie = new Movies(obj);
    await movie.save();
    res.send(movie);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genres.find({ _id: new ObjectID(req.body.genreId) });
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movies.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

// put
// router.put("/:id", async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genres.findById(req.body.genreId);
//   if (!genre) return res.status(400).send("invalid genre");

//   obj1 = {
//     title: req.body.title,
//     genre: {
//       _id: genre._id,
//       name: genre.name,
//     },
//     numberInStock: req.body.numberInStock,
//     dailyRentalRate: req.body.dailyRentalRate,
//   };

//   try {
//     const movie = await Movies.findByIdAndUpdate(req.params.id, {
//       obj1,
//     });
//     // console.log( " put" , obj1)
//     if (!movie) return res.status(404).send("not avalabile");
//     await res.send(movie);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.delete("/:id", [auth, admin], async (req, res) => {
  // check id
  try {
    // const genre = await Genres.deleteOne( { _id:req.params.id}) not working
    const movie = await Movies.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send("not avalabile");

    await res.send(movie);
  } catch (err) {
    console.log(err);
  }
  //delete
});

module.exports = router;
