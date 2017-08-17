var http = require('http'),
    express = require('express'),
    path = require('path'),
    MongoClient=require('mongodb').MongoClient,
    Server=require('mongodb').Server,
    CollectionDriver=require('./driver').CollectionDriver;
 
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
 
app.get('/:collection', function(req, res) { //A
   var params = req.params; //B
   collectionDriver.findAll(req.params.collection, function(error, objs) { //C
        if (error) { res.send(400, error); } 
        else { 
            if (req.accepts('html')) { //E
                res.render('data',{objects: objs, collection: req.params.collection}); //F
              } else {
            res.set('Content-Type','application/json'); //G
                  res.send(200, objs); //H
              }
         }
    });
});
 
app.get('/:collection/:entity', function(req, res) { //I
   var params = req.params;
   var entity = params.entity;
   var collection = params.collection;
   if (entity) {
       collectionDriver.get(collection, entity, function(error, objs) { //J
          if (error) { res.send(400, error); }
          else { res.send(200, objs); } //K
       });
   } else {
      res.send(400, {error: 'bad url', url: req.url});
   }
});

app.use(function (req,res) {
    res.render('404', {url:req.url});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});