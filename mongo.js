//using MongoDB with Node.js

var mongodb=require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb"; //if it doesn't exist, mongoDB will create a database here called mydb

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");

  /*db.createCollection("users", function(err, res){ //createCollection makes a table called "users"
  	if (err) throw err;
  	console.log("Made a table");
  	db.close();
  });*/

  var myobj = { name: "Charlotte", school: "University of Guelph" };
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
  { name: "Mila", school: "McMaster" }, //each is an entry
  {name: "Anna", school: "Waterloo"},
  {name: "Grace", school: "Laurier"}
  ];
  db.collection("users").insertMany(myobjs, function(err, res) { //insert multiple entry
    if (err) throw err;
    console.log(res.insertedCount+" records inserted");
});
    db.collection("users").findOne({}, function (err, result){ //findOne() returns the first matching occurence in the selection
    	if (err) throw err; //this example will select all records, but only returns the first

    	console.log(result.name);

    
   
  });

    db.collection("users").find({}).toArray(function(err, result){ //find returns all matching results
    	if (err) throw err;
    	console.log(result);
    	console.log(result[10].school); //return the school of the 11th record
    	db.close();
    });

     

});


  