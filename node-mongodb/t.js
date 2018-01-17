/**
 * Created by gmhanna on 02-May-17.
 */

let MongoClient  = require('mongodb').MongoClient;
let assert = require('assert');

let url = 'mongodb://localhost:27017/conFusion'   // specify the db

// Establish the connection with the db:

MongoClient.connect(url, function(err, db){
    assert.equal(err, null);
    console.log("Connected correctly to server");

    let collection = db.collection("dishes");

    // insert a document into the collection

    collection.insertOne({name: "Uthapizza", description:"test"}),function(err, result){
      assert.equal(err, null);
      console.log("After Insert:");
      console.log(result.ops);   // will print out an afrray containing all the inserted documents
        // result.result.n returns the number of elements, etc... check doc


        // Retrieve all the documents in this collection
                        // inside find: filters the collection
        collection.find({}).toArray(function(err, docs){

            assert.equal(err, null);
            console.log("Found: ");
            console.log(docs);


            // after i print out, i want to drop this collection:

            db.dropCollection("dishes", function(err, result){

                assert.equal(err, null);
                db.close();
            });
        });
    };



});