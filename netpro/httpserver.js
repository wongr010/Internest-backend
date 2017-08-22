//9dd8e68d97624eec99ed1842726cc483

var http = require('http'),
    express = require('express'),
    path = require('path'),
    MongoClient=require('mongodb').MongoClient,
    Server=require('mongodb').Server,
    CollectionDriver=require('./driver').CollectionDriver,
    request=require('request');
 
var app = express();
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views')); //A
app.set('view engine', 'jade');
app.use(express.bodyParser()); // <-- add
//B
var mongoHost='localHost';
var mongoPort=27017; //mongoDB database is default hosted at http://localhost:27017
var collectionDriver;

var mongoClient=new MongoClient(new Server(mongoHost, mongoPort)); //create the server to launch the database
mongoClient.open(function(err, mongoClient) { //Connect to the server we just made above
  if (!mongoClient) {
      console.error("Error! Exiting... Must start MongoDB first");
      process.exit(1); //you need to start mongoDB in the terminal in order for this to work.
      //if you haven't started it, we exit the function
  }
  var db = mongoClient.db("Netpro");  //creating a database called Netpro, if you can connect to the database
  //if this database already exists, it will find it and use it
  collectionDriver = new CollectionDriver(db); //create a CollectionDriver object
  //we create a CollectionDriver object from the CollectionDriver library we made previously
});

app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});
 
app.get('/:collection', function(req, res) { 
  /*The ':' before 'collection' specifies that it accepts ANY value after the '/' in localhost:3000/
  In other words, this function could handle localhost:3000/me, localhost:3000/you, localhost:3000/any-random-string
  if there was no ':', this function would ONLY handle the GET request for url localhost:3000/collection
  */ 
   var params = req.params; //B
   collectionDriver.findAll(req.params.collection, function(error, objs) { //call the findAll function from driver.js
        if (error) { res.send(400, error); } 
        else { 
            if (req.accepts('html')) { //check if the request will accept a html response
                res.render('data',{objects: objs, collection: req.params.collection}); //if yes, the html response is 
              } else {                                                                //stored in the data.jade template
            res.set('Content-Type','application/json'); //if html not accepted, use JSON format
                  res.send(200, objs); //send a success code and the JSON response
              }
         }
    });
});

app.get('/:collection/news', function(req, res){
  console.log('Hello');
   var item={uri: "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=9dd8e68d97624eec99ed1842726cc483",
  method: "GET",
  timeout: 10000,
  followRedirect: true,
  maxRedirects:20
}

request(item, function(error, resp, body){
  if (error) res.send(400, error);
  else{
    res.send(200, resp);
    res.send(null, body);
  }
});

});
 
/*app.get('/:collection/:entity', function(req, res) { //handles a GET request for URL localhost:3000/any-value/any-value
   var params = req.params;
   var entity = params.entity;
   var collection = params.collection;
   if (entity) {
       collectionDriver.get(collection, entity, function(error, objs) { //looking for a specific entry in a collection, using our driver.js function
          if (error) { res.send(400, error); }
          else { res.send(200, objs); } //if there isn't an error, return the entry as a JSON object
       });
   } else {
      res.send(400, {error: 'bad url', url: req.url});
   }
});*/

app.post('/:collection', function(req, res) { //A
    var object = req.body;
    var collection = req.params.collection;
    collectionDriver.save(collection, object, function(err,docs) {//save the POST input to the collection
          if (err) { res.send(400, err); } 
          else { res.send(201, docs); } //if there isn't an error, reply with code 201 and print out the entire response
     });
});


app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});