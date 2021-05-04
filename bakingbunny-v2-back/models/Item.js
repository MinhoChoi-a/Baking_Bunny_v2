const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ItemSchema = new Schema(
  
  {
    type: {
        type: String, 
        required: true,
        enum:['cake', 'dacqouise']
    },    
    name_eng: {
        type: String, 
        required: true
    },
    name_kor: {
        type: String, 
        required: true
    },
    tastes_eng: {
        type: [String], 
        required: true
    },
    tastes_kor: {
        type: [String], 
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    avaialbe_month: {
        type: [Number],
        required: true
    },
    image_source: {
        type: String, 
        required: true
    }
  }

);

//Export model
module.exports = mongoose.model('item', ItemSchema);