var fs = require("fs");
var data = '';

// Create a readable stream
var readerStream = fs.createReadStream('practice.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) { //handling data input
   data += chunk;
});

readerStream.on('end',function(){ //handling end of data input
   console.log(data);
});

readerStream.on('error', function(err){ //handling an error
   console.log(err.stack);
});

console.log("Program Ended");