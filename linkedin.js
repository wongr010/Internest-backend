var request = require('request');
var fs=require("fs");
request
  .get('http://localhost:3000')
  .on('response', function(response) {
    console.log(response.statusCode) // 200 
    console.log(response.headers['content-type']) // 'image/png' 
  })
  .pipe(request.put('http://localhost:3000'))

  request
  	.get('https://api.linkedin.com/v1/people/~',
  	{
  		'Host': 'api.linkedin.com',
  		'Connection': 'Keep-Alive',
  		'auth': {
  			'bearer': 'AQXOXPsFglp_L4P97IEgmhKR…zvIqWOqRJ9VrLwrzMsNUOtc'
  		}
  	})
  	.on('response', function(response){
  		console.log(response.statusCode) // 200 
    	console.log(response.headers['content-type']) // 'image/png' 
  	})
  	.pipe(request.put('https://api.linkedin.com/v1/people/~'))