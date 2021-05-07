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
    size: {
        type: [Number],
        required: true,
        default: [],
    },
    avaialbe_month: {
        type: [Number],
        required: true,
        default: [1,2,3,4,5,6,7,8,9,10,11,12],
    },
    image_source: {
        type: String, 
        required: true,
        default: "bakingbunny image link"
    }
  }

);

//Export model
module.exports = mongoose.model('item', ItemSchema);