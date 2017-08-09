//file used for interacting with database
var mongoclient=require('mongodb').MongoClient;

var state={
	db: null,
}

//module.exports: module is a default module in JS and whatever is 
//assigned as exports is default exported in the module



exports.connect= function(url, done){
	if (state.db) return done();

	mongoclient.connect(url, function(err, db){
		if (err) return done(err);
		state.db=db;
		/*state.db.createCollection("internest-users", function(err, res){
			if (err) throw err;
			console.log("Table created!");

		});*/
		done();
	})

}


exports.add=function(obj, done){
	//if (state.db) return done();
	console.log("inserting...");
	state.db.collection("users").insert(obj, function(err, res){
		if (err) console.log('Error')
		else console.log("inserted successfully");
	});

}

exports.get=function(){
	return state.db;
}

exports.close=function(done){
	if (state.db){
		state.db.close(function(err, result){
			state.db=null;
			state.mode=null;
			done(err);
		})
	}
}