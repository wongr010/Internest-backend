//9dd8e68d97624eec99ed1842726cc483

var http = require('http'),
express = require('express'),
path = require('path'),
MongoClient=require('mongodb').MongoClient,
Server=require('mongodb').Server,
CollectionDriver=require('./driver').CollectionDriver,
bodyParser=require('body-parser')
request=require('request');

var app = express();
app.set('port', process.env.PORT || 3000); 
app.set('views', path.join(__dirname, 'views')); //A
app.set('view engine', 'jade');
app.use(express.bodyParser()); // <-- add
//app.use(connect.bodyParser({strict: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());
//B
var mongoHost='localHost';
var mongoPort=27017; //mongoDB database is default hosted at http://localhost:27017
var collectionDriver;

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.set('json spaces', 2);

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
  //New York Times API key 28bf97a57a9648a0bbdfd5c1ff61a96f
 request.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json", //send a GET request to this NYT site
  qs: {
    'api-key': "28bf97a57a9648a0bbdfd5c1ff61a96f"//API key is required to access their data
  },
}, function(err, response, body) {
  body = JSON.parse(body); //the response is in JSON format. This just formats it so that it is displayed neatly
  res.send(body); //send the response data to the website
})

});

app.get('/:collection/news/:company', function(req, res){
  request.get({
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  qs: {
    'api-key': "28bf97a57a9648a0bbdfd5c1ff61a96f",
    'q': req.params.company //the 'q' parameter allows you to search up articles based on the ':company' parameter in the URL
  },
}, function(err, response, body) {
  body = JSON.parse(body);
  res.send(body);
})
})

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

app.put('/:collection/:entity', function(req, res) { 
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;
  var object=req.body;

  if (entity) {

       collectionDriver.update(collection, object, entity, function(error, objs) { //passing a JSON object to the collectionDriver update function
        if (error) { res.send(400, error); }
          else { res.send(200, 'update successful'); } //if there's no error, send code 200 (successful) and display "update successful" to terminal
        });
     } else {
       var error = { "message" : "Cannot PUT a whole collection" };
       res.send(400, error);
     }
   });

app.delete('/:collection/:entity', function(req, res) { 
  var params = req.params;
  var entity = params.entity;
  var collection = params.collection;
  if (entity) {
       collectionDriver.delete(collection, entity, function(error, objs) { //send the object and its collection to the collectionDriver delete function
        if (error) { res.send(400, error); }
          else { res.send(200, 'Delete successful'); } //Send the success code, display response summary
        });
     } else {
       var error = { "message" : "Cannot DELETE a whole collection" };
       res.send(400, error);
     }
   });


app.use(function (req,res) {
  res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

