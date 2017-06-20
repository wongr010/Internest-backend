/*var fs=require("fs");
//1. Program blocks until file is read and then terminates
var data=fs.readFileSync('practice.txt');
 //read from file
console.log(data.toString()); //convert read data to string
console.log("The end!");

//2. Program does not wait for file to be read and proceeds to write
//termination message simultaneously with file reading

fs.readFile('practice.txt', function(err, data){
	if(err) return console.error(err);
	console.log(data.toString());

});

console.log("2. The end!");*/


//EVENT EMITTER

// Import events module
var events = require('events');


// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
   console.log('connection successful.');
  
   // Fire the data_received event 
   eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);
 
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function(){ //on(event, listener) adds a listener to the specified event
   console.log('data received');
});

// Fire the connection event 
eventEmitter.emit('connection');

console.log("The end.");

//event emitter class https://www.tutorialspoint.com/nodejs/nodejs_event_emitter.htm

//reading and writing to the buffer 
buf=new Buffer(20); 
len=buf.write("What is a buffer"); //buf.write(string[, offset][, length][, encoding]) <- writing

console.log("We wrote "+ len+" octets");
console.log(buf.toString('utf8')); //buf.toString([encoding][, start][, end]) <- reading
 

 //convert buffer contents to JSON
 var buf2=new Buffer("Can I convert this to JSON?");
 var json=buf2.toJSON(buf2);
 console.log(json);

 //concatenating 2 buffers
 var totalbuf=Buffer.concat([buf, buf2]);
 console.log("Full buffer is: "+totalbuf)

 //reference to buffer methods: https://www.tutorialspoint.com/nodejs/nodejs_buffers.htm

 
 