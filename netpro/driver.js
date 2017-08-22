var objectID=require('mongodb').ObjectID;

CollectionDriver=function(db){
	this.db=db;
}; //constructor to store a mongoDB client instance 

//find a specified collection
CollectionDriver.prototype.getCollection=function(collectionName, callback){ //fetches a collection object and returns the collection or an error

	this.db.collection(collectionName, function(error, thecollection){
		if (error) callback(error);
		else callback(null, thecollection); //the first parameter of the callback function is an error
	}); //a callback function is a function that is called at the completion of a task
};

//function that goes to the database and finds all matching collections
//results are stored in an array
CollectionDriver.prototype.findAll = function(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error);
      else {
        the_collection.find().toArray(function(error, results) { //B
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

//finds one object that matches the _id parameter
CollectionDriver.prototype.get = function(collectionName, id, callback) { //A
    this.getCollection(collectionName, function(error, the_collection) {
        if (error) callback(error);
        else {
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$"); //checking that it is a hex string, ObjectID only accepts hex strings
            if (!checkForHexRegExp.test(id)) callback({error: "invalid id"});
            else the_collection.findOne({'_id':ObjectID(id)}, function(error,doc) { //C
                if (error) callback(error);
                else callback(null, doc);
            });
        }
    });
};

//stores an object, 'obj' into a collection, 'collectionName'
CollectionDriver.prototype.save = function(collectionName, obj, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //find the specified collection
      if( error ) callback(error)
      else {
        obj.created_at = new Date(); //add another variable to the inserted object, 'created_at', and assign it to the current date
        the_collection.insert(obj, function() { //insert the object into collection
          callback(null, obj);
        });
      }
    });
};

exports.CollectionDriver=CollectionDriver;
//export this module (like a library)