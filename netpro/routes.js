var express=require('express');

var router=express.Router()

function dateDisplayed(timestamp){
	var date=new Date(timestamp);
	return (date.getMonth()+1+'/'+date.getDate()+'/'+date.getFullYear()+" "+date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}
//all routers requests go through this
router.use(function timeLog(req, res, next){
	console.log("Request recieved: ", dateDisplayed(Date.now()));
	next(); //continue to the appropriate request handler
});

router.get('/', function(req, res){
	res.json({message: 'REST API ready'});
});

module.exports=router; //export this