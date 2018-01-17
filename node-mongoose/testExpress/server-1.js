/**
 * Created by gmhanna on 03-May-17.
 */

let mongoose = require('mongoose');
let assert = require('assert');

let Dishes = require('./models/dishes-1');

// open cnx

let url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
   // connected:
    console.log("Connected correctly to server");

    // create a new dish
    let newDish = Dishes({
        name: "Uthapizza",
        description: 'Test'
    });

    // save the dish
    newDish.save(function(err){
        if(err) throw err;
        console.log("Dish Created");

        // get all the dishes
        Dishes.find({}, function(err, dishes){
           if(err) throw err;

           console.log(dishes);

           db.collection('dishes').drop(function(){
              db.close();
           });
        });

    });



});