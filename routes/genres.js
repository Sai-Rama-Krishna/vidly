
const Joi = require('joi')
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const Genres = mongoose.model('Genres', new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:10,
        required:true,
    }
}) )



router.get('/',  async ( req, res) => {
   const genres = await Genres.find().sort('name')
    res.send(genres);
});

router.get('/:id', async ( req, res) => {
    try{
        const genre = await Genres.findById(req.params.id)
        if (!genre) return res.status(404).send('not avalabile');
        res.send(genre);

    }
    catch (err){
        console.log(err)
    }
});

//post 
router.post('/', async (req , res ) => { 

    const { error} = validatePersons(req.body)

  if(error) return res.status(400).send(error.details[0].message)
    let genre =  new Genres ( { name:req.body.name})
      genre = await genre.save();
     res.send(genre)
});

// put 
router.put('/:id', async (req , res ) => {
    
    const { error} = validatePersons(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //check id person 
    try{
        
        const genre =  await Genres.findByIdAndUpdate( {_id:req.params.id}, {name:req.body.name});
        if (!genre) return res.status(404).send('not avalabile');
        await  res.send(genre);
    }
    catch (err) {
     console.log(err)
    }


});


// validation function 
function validatePersons(yyy){
    const schema = {
        name:Joi.string().min(3).required()
    };
    return  Joi.validate(yyy,schema);

}


router.delete('/:id', async (req,res) => {

    // check id
    try{
        // const genre = await Genres.deleteOne( { _id:req.params.id}) not working
        const genre =  await Genres.findByIdAndRemove( req.params.id)
        if (!genre) return  res.status(404).send('not avalabile');

         await res.send(genre);
    }
catch (err) { 
    console.log(err);
}
//delete
  

})


module.exports = router;