const Joi = require('joi');
const boolean = require('joi/lib/types/boolean');
const mongoose = require('mongoose');

const rental = mongoose.model( 'rental', new mongooseSchema({
 customer: { type: new mongoose.Schema({
     name:{
        type:String,
        minlength:3,
        maxlength:50,
        required:true
     },
     gold:{
         required:true,
         default:false,
         type:Boolean
     },
     phone:{
         type:String,
         minlength:3,
        maxlength:50,
        required:true
     }
  }) ,
  required:true
},

movie:{ 
    type: new mongooseSchema( { 

        title: {
            type:String,
         minlength:3,
        maxlength:50,
        required:true,
        trim:true
        },
        rent:{
            type:Number,
            required: true,
            min: 0,
            max: 255
        }
    }),
    required:true
}

}));

function validaterental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
      };
    
      return Joi.validate(rental, schema);
}

exports.rental= rental;
exports.validate = validaterental