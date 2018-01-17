/**
 * Created by gmhanna on 03-May-17.
 */
//Supports comments
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create a Schema

let commentSchema = new Schema({

    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    }
}, {timestamps: true});



let dishSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// create a model

let Dishes = mongoose.model('Dish', dishSchema);

// make it available as a module:
module.exports = Dishes;

