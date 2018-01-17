/**
 * Created by gmhanna on 03-May-17.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Create a Schema

let dishSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create a model

let Dishes = mongoose.model('Dish', dishSchema);

// make it available as a module:
module.exports = Dishes;

