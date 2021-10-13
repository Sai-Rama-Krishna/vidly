
const mongoose = require('mongoose');
const Joi = require('joi')

const custoschema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2,
        maxlength:10,
        required:true,
    },
    gold:{
        type:Boolean,
        default : false
    },

    phone:{
        type:String,
        minlength:2,
        maxlength:10,
        required:true,
    },
})


const customers = mongoose.model('customers', custoschema );


function validatecustomers(arg){
    const schema = {
        name:Joi.string().min(3).required(),
        phone:Joi.string().min(5).max(10).required(),
        gold:Joi.boolean()
    };
    return  Joi.validate(arg,schema);

}

exports.validate = validatecustomers;
exports.customers = customers;