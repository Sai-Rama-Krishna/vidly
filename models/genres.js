const mongoose = require('mongoose');
const Joi = require('joi')



const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:10,
        required:true,
    }
})

const Genres = mongoose.model('Genres', genreSchema )


// validation function 
function validatePersons(yyy){
    const schema = {
        name:Joi.string().min(3).required()
    };
    return  Joi.validate(yyy,schema);

}

exports.genreSchema = genreSchema;
exports.Genres = Genres;
exports.validate = validatePersons;