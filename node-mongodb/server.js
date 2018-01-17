/**
 * Created by gmhanna on 02-May-17.
 */

let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let dboper = require('./operations'); // db operations that is already done
let url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected correctly to server");

    dboper.insertDocument(db, {name:"Vadonut", description:"Test"}, "dishes", function(result){
       console.log(result.ops);
       dboper.findDocuments(db, "dishes", function(docs){
            console.log(docs);

            dboper.updateDocument(db, {name:"Vadonut"}, {description:"Updated Test"}, "dishes", function(result){
                console.log(result.result);

                dboper.findDocuments(db, "dishes", function(docs){
                   console.log(docs);

                   db.dropCollection("dishes", function(result){
                      console.log(result);
                      db.close();

                   });
                });
            });
       });
    });
});