/**
 * Created by gmhanna on 08-May-17.
 */

let mongoose = require('mongoose'),
    assert = require('assert');

let Dishes = require('./models/dishes'),
    Promotions = require('./models/promotions'),
    Leaders = require('./models/leadership');

// Open Connection:

let url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){

    console.log('Connected correctly to server!');

    Dishes.create({
        "name": "Uthapizza",
        "image": "images/uthapizza.png",
        "category": "mains",
        //"label": "Hot",
        "price": 4.99,
        "description": "A unique . . .",
        "comments": [
            {
                "rating": 5,
                "comment": "Imagine all the eatables, living in conFusion!",
                "author": "John Lemon"
            },
            {
                "rating": 4,
                "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
                "author": "Paul McVites"
            }
        ]
    }, function(err, dish){
        if (err) throw err;

        console.log('Dish Created!');
        console.log(dish);

        let id = dish._id;

        // Get all Dishes:

        setTimeout(function(){

            Dishes.findByIdAndUpdate(id, {$set: {description:'Updated Description'}}, {new: true})
                .exec(function(err, dish){
                   if (err) throw err;
                   console.log('Updated Dish!');
                   console.log(dish);

                  dish.price += 5;


                    dish.save(function(err, dish){
                        console.log('Updated price');
                        console.log(dish);

                        db.collection('dishes').drop(function () {
                            db.close();
                        });
                    });
                });
        }, 3000);
    });


    // Promotions::::::

    Promotions.create({

        "name": "Weekend Grand Buffet 4",
        "image": "images/buffet.png",
        "label": "New",
        "price": "19.99",
        "description": "Featuring . . ."
    }, function(err, promotion){
       if (err) throw err;

       console.log('Promotion Created');
       console.log(promotion);
       let id = promotion._id;


    });

    Leaders.create({

        "name": "Peter Pan 3",
        "image": "images/alberto.png",
        "designation": "Chief Epicurious Officer",
        "abbr": "CEO",
        "description": "Our CEO, Peter, . . ."

    }, function(err, leader){
        if(err) throw err;

        console.log('Leader Created');
        console.log(leader);
    });
});

