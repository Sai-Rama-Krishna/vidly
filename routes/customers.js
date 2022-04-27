const Joi = require('joi')
const express = require('express');
const { customers , validate} = require('../models/customers')
const mongoose = require('mongoose');
const router = express.Router();



router.get('/',  async ( req, res) => {
    const customer = await customers.find().sort('name')
     res.send(customer);
 });

 router.get('/:id', async ( req, res) => {
    try{
        const customer = await customers.findById(req.params.id)
        if (!customer) return res.status(404).send('not avalabile');
        res.send(customer);

    }
    catch (err){
        console.log(err)
    }
});
router.post('/', async (req , res ) => { 
    try{ 
        const { error} = validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
    let customer =  new customers( {
         name:req.body.name ,
          phone:req.body.phone,
           gold:req.body.gold
        })
      customer = await customer.save();
     res.send(customer)

    }
    catch (err) {
        console.log(err)
    }
 
});


router.delete('/:id', async (req,res) => {

    // check id
    try{
        // const genre = await Genres.deleteOne( { _id:req.params.id}) not working 
        const customer =  await customers.findByIdAndRemove( req.params.id)
        if (!customer) return  res.status(404).send('not avalabile');

         await res.send(customer);
    }
catch (err) { 
    console.log(err);
}
//delete
  
})

router.put('/:id', async (req , res ) => {
    const { error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //check id person 
    try{
        
        let customer =  await customers.findByIdAndUpdate(req.params.id,
            { 
              name: req.body.name,
              gold: req.body.gold,
              phone: req.body.phone
            }, { new: true });

        if (!customer) return res.status(404).send('not avalabile');
        //  customer = await customers.updateMany( { Gold:req.body.Gold} , { name:req.body.name} , { phone:req.body.phone})
        await  res.send(customer);
    }
    catch (err) {
     console.log(err)
    }
});



module.exports = router;