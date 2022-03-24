const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbDriver = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';


MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    var doc = {name: "Paratha", description: "Delicious"};
    var coll = "dishes";

    dbDriver.insertDocument(db, doc, coll, (result) => {
        console.log("Insert Document:\n", result.ops);
    });

    dbDriver.findDocuments(db, coll, (doc)=>{
        console.log("Found Document:\n", doc);
        dbDriver.updateDocument(db, {name: "Paratha"}, {description: "More Delicious"}, coll, (result)=>{
            console.log("Updated document:\n", result.result);
        });
        dbDriver.findDocuments(db, coll, (doc)=>{
            console.log("Found Document:\n", doc); 
            db.dropCollection(coll, (result)=>{
                console.log("Dropped collection:\n", result);
                client.close();
            });
        });
    });
});