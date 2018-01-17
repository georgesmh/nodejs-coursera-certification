/**
 * Created by gmhanna on 03-May-17.
 */

let mongoose = require('mongoose'),
    assert = require('assert');

let Dishes = require('./models/dishes-1');

// open cnx

let url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
    // connected:
    console.log("Connected correctly to server");

    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    }, function (err, dish) {
        if (err) throw err;

        console.log('Dish Created!');
        console.log(dish);

        let id = dish._id;

        // get all the dishes
        setTimeout(function () {

            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {new: true}) // to return the updated dish
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    db.collection('dishes').drop(function () {
                        db.close();
                    });
                });
        }, 3000); // to show that the created and updated fields will be different when updating or creating a document
    })
});