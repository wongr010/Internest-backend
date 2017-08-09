var http=require('http');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db){
	if (err) throw err;

	var query={name: "Rosalyn"}; //search records for "Anna"
	db.collection("users").find(query).toArray(function(err, result){
		if (err) throw err;
		console.log(result);
		
	});
	console.log('\n');
	//Search records with universities that start with the letter U
	var letter={school: /^U/}
	db.collection("users").find(letter).toArray(function(err, result){
		if (err) throw err;

		console.log(result);

	});

	console.log('\n');
	console.log('\n');

	var upsort={name: 1}; //sorting the data alphabetically by name
	db.collection("users").find().sort(upsort).toArray(function(err, result){
		if (err) throw err;
		console.log(result); //print out the records in alphabetical order
		console.log('\n');
		console.log('\n');

	});
	var downsort={name: -1}; //descending alphabetical order
	db.collection("users").find().sort(downsort).toArray(function(err, result){
		if (err) throw err;
		console.log(result); //print out the records in alphabetical order
		

	});

	var newquery={name: 'Rosalyn'}; //delete one record with name: Rosalyn
	db.collection("users").deleteOne(newquery, function(err, obj){
		if (err) throw err;
		console.log("Deleted Rosalyn");
	});

	var manyquery={name: 'Rosalyn'}; //delete all records with name='Rosalyn'
	db.collection("users").deleteMany(newquery, function(err, obj){
		if (err) throw err;
		console.log(obj.result.n + " documents deleted");
	});

	db.close();
});