const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const { Rental , validate} = require('../models/rentals');
const { customers } = require('../models/customers');
const { Movies } = require('../models/movies');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req,res) => {
  const rentals = await Rental.find().sort('name')

  res.send(rentals)

})

router.post('/', async ( req, res) => {
  const { error} = validate(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await customers.findById(req.body.customerId);
  if(!customer) return res.status(404).send('Invalind Customer')

  const movie = await Movies.findById(req.body.movieId);
  if(!movie) return res.status(404).send('invalid movie')

  if( movie.stock === 0) return res.status(400).send('out of stock');

  let rental = new Rental({
      customer :{
          _id:customer._id,
          name:customer.name,
          phone:customer.phone,
          
      },
      movie:{
          _id:movie._id,
          title:movie.title,
            rent:movie.rent
      }
  })

  try{

      new Fawn.Task()
      .save('rentals',rental)
      .update('movies', { _id:movie._id},{
          $inc:{stock:-1}
      })
      .run();
      res.send(rental);
  }
  catch(err){
res.status(500).send(' fawn task error')
  }
})




module.exports = router;