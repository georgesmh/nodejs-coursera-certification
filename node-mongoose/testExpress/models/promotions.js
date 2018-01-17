/**
 * Created by gmhanna on 09-May-17.
 */

let mongoose = require('mongoose'),
    assert = require('assert');

let Schema = mongoose.Schema;
// For Currency:

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
let Currency = mongoose.Types.Currency;

let promotionSchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required:true
    },
    label:{
        type: String,
        required: false,
        default: ""
    },
    price:{
        type: Currency,
        required: true
    },
    description:{
        type:String,
        required: true
    }
}, {timestamps: true});

let Promotions =mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;