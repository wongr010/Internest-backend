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

//writing to a stream (text file)


var data = "I don't know what it says about interns";

// Create a writable stream
var writerStream = fs.createWriteStream('outpractice.txt');

// Write the data to stream with encoding to be utf8
writerStream.write(data,'UTF8');

// Mark the end of file
writerStream.end();

// Handle stream events --> finish, and error
writerStream.on('finish', function() {
    console.log("Write completed.");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("Program Ended");