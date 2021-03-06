const { Genres, validate } = require("../models/genres");
const auth = require("../middleware/auth");
const express = require("express");
const mongoose = require("mongoose");
const admin = require("../middleware/admin");

const router = express.Router();


router.get("/", async (req, res) => {
  // throw new Error("could not get the genres");
  const genres = await Genres.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genres.findById(req.params.id);
  if (!genre) return res.status(404).send("not avalabile");
  res.send(genre);
});

//post
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genres({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// put
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check id person
  try {
    const genre = await Genres.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name }
    );
    if (!genre) return res.status(404).send("not avalabile");
    await res.send(genre);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", [auth, admin], async (req, res) => {
  // check id
  try {
    // const genre = await Genres.deleteOne( { _id:req.params.id}) not working
    const genre = await Genres.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send("not avalabile");

    await res.send(genre);
  } catch (err) {
    console.log(err);
  }
  //delete
});

module.exports = router;
