//Open index.html using Express framework

var express=require('express'); //include express
var bodyParser = require('body-parser');
var db=require('./database');
var app=express(); //create an express application
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var path=require('path'); //used to join variables to create a file path
var popup=require('window-popup').windowPopup;

db.connect('mongodb://localhost:27017/userdatabase', function(err){
	if (err){
		throw err;
		process.exit(1);
	}
	else{
		app.listen(4000, function(){
			console.log("I'm listening...")
		})
	}
})


//var router=express.Router();
//var cookieParser = require('cookie-parser');

//var expressValidator = require('express-validator');

//app.set('port', 2000); //run on port 2000

app.use(express.static(path.join(__dirname, 'index')));
//__dirname is a node variable that contains the directory of this file
//join this string with 'index', name of the folder containing the static files

//listening for client requests



/*
var server=app.listen(app.get('port'), function(){ //app.get('port') returns 2000
	var port=server.address().port;
	console.log("I'm listening");

});*/

app.post('/profile-setup', function(req, res){
	console.log(req.body);
	if (req.body.password != req.body.confirmpassword){
		//popup(500, 500, 'Passwords do not match!');
		return;
	}
	res.send("<p> New text </p>");

	
	db.add(req.body, function(err){
		if (err) throw err;
		else console.log("successful");
	})

});


