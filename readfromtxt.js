var fs=require("fs");

var data=fs.readFileSync('practice.txt');

console.log(data.toString());
console.log("The end!");