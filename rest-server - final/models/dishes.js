/**
 * Created by gmhanna on 03-May-17.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


// For Currency:

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
let Currency = mongoose.Types.Currency;



let commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});


let dishSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    label:{
        type: String,
        required: false,
        default: ""
    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {timestamps: true});

let Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;