const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbDriver = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
var doc = {name: "Paratha", description: "Delicious"};
var coll = "dishes";


MongoClient.connect(url)
    .then((client) => {
        console.log('Connected correctly to server');
        const db = client.db(dbname);
        return dbDriver.insertDocument(db, doc, coll)
    .then((result) => {
        console.log("Insert Document:\n", result.ops);
        return dbDriver.findDocuments(db, coll)
    }).then((doc)=>{
        console.log("Found Document:\n", doc);
        return dbDriver.updateDocument(db, {name: "Paratha"}, {description: "More Delicious"}, coll)
    }).then((result)=>{
        console.log("Updated document:\n", result.result);
        return dbDriver.findDocuments(db, coll)
    }).then((doc)=>{
        console.log("Found Document:\n", doc); 
        return db.dropCollection(coll)
    }).then((result)=>{
        console.log("Dropped collection:\n", result);
        client.close();
    });
})
.catch((err)=> console.log(err));