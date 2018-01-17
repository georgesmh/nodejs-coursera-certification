/**
 * Created by gmhanna on 29-May-17.
 */

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let favoriteSchema = new Schema({

    dishes:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Dish'
    }],

    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }


}, {timestamps: true});

let Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;


