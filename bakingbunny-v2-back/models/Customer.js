const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var customerSchema = new Schema(
  
  {
    username: String,
    
    passwordHash: String,    
    
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

customerSchema.set('toJSON', {

  transform: (document, returnedObject) => {

    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash

  }
})

//Export model
module.exports = mongoose.model('Customer', customerSchema);