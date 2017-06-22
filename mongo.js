//using MongoDB with Node.js

var mongodb=require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb"; //if it doesn't exist, mongoDB will create a database here

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  /*db.createCollection("users", function(err, res){ //createCollection makes a table
  	if (err) throw err;
  	console.log("Made a table");
  	db.close();
  });*/

  var myobj = { name: "Rosalyn Wong", school: "University of Toronto" };
  db.collection("users").insertOne(myobj, function(err, res) { //insert one entry
    if (err) throw err;
    console.log("1 record inserted");
    db.close();
  });


  
});


//insert multiple entries
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  

  var myobjs = [
  { name: "Rosalyn Wong", school: "University of Toronto" }, //each is an entry
  {name: "Stark Draper", school: "UC Berkley"},
  {name: "Clare", school: "MIT"}
  ];
  db.collection("users").insertMany(myobjs, function(err, res) { //insert multiple entry
    if (err) throw err;
    console.log(res.insertedCount+" records inserted");
    db.close();
  });

});


  