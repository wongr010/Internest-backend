
var http=require("http"); //require the http module
var fs=require("fs");


fs.readFile('index.html', function (err, html) {
	if (err) {
		throw err; 
	} 

	var server=http.createServer(function(request, response){ 
	//createServer creates an instance of a local server, named 'server'
	//function takes a callback function as an argument
	//callback function is a function that is called every time a client sends a request to the server

	response.writeHead(200, {"Content-Type": "text/html"}); //http status code
	/*response.write('<!DOCTYPE html><html lang="en"><head>');
    response.write('<meta charset="utf-8">');
	
	response.write("<title>Hello World Page</title>");
	response.write("</head>");
	response.write("<body>");
	response.write("Hello World!");
	response.write("</body>");
	response.write("</html>");*/

	response.write(html);
	response.end();


}).listen(8080); //bind server to port 80, listen for connections
});
console.log("The end"); //access using localhost:8080