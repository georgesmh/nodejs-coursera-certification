/**
 * Created by gmhanna on 24-Apr-17.
 */

let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');

// Connection URL

let url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the server:

MongoClient.connect(url, function(err, db){

    assert.equal(err, null);
    console.log("Connected correctly to server");

    let collection = db.collection("dishes");

    collection.insertOne({name: "Uthapizza", description:"test"}, function(err, result){

        assert.equal(err, null);
        console.log("After Insert:");
        console.log(result.ops); // array of inserted objects, result.result.n ==> number of added elements

        collection.find({}).toArray(function(err, docs){
           assert.equal(err, null);
           console.log("Found:");
           console.log(docs);

          db.dropCollection("dishes", function(err, result){

               assert.equal(err, null);
               db.close();
           });
        });
    });

});
