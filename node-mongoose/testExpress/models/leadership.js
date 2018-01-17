
/**
 * Created by gmhanna on 09-May-17.
 */

let mongoose = require('mongoose'),
    assert = require('assert'),
    Schema = mongoose.Schema;

let leaderSchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required : true
    },
    designation:{
        type: String,
        required : true
    },
    abbr:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required : true
    },
}, {timestamps: true});

let Leaders = mongoose.model('Leader', leaderSchema);

module.exports = Leaders;