const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var customerSchema = new Schema(
  
  {
    name: {
        type: String, 
        required: true
    },
    insta_email: {
        type: String, 
        required: true
    },
    phone: {
        type: String, 
        required: true
    },
    allergy: {
        type: String, 
        required: true
    },    
  }

);

//Export model
module.exports = mongoose.model('Customer', customerSchema);