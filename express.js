//Open index.html using Express framework

var express=require('express'); //include express
var bodyParser = require('body-parser');
var app=express(); //create an express application
var path=require('path'); //used to join variables to create a file path
//var router=express.Router();
//var cookieParser = require('cookie-parser');

//var expressValidator = require('express-validator');

app.set('port', 3000); //run on port 3000

app.use(express.static(path.join(__dirname, 'index')));
//__dirname is a node variable that contains the directory of this file
//join this string with 'index', name of the folder containing the static files

//listening for client requests
app.post('/yes', function(req, res){
	console.log("Yes! We got it!");
	res.send("<p> New text </p>");
})


var server=app.listen(app.get('port'), function(){ //app.get('port') returns 3000
	var port=server.address().port;
	console.log("I'm listening");

});


