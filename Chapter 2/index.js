const http = require('http');
const fs = require('fs');

//filereading
const index = fs.readFileSync('index.html');
//json data
const data = {age:24};
const server = http.createServer((req,res) =>{
  console.log(req.url);
  console.log("Server Started");
  //seting the dummy header
  res.setHeader('Dummy', 'DummyValue')

  //telling in header that data type is json
  res.setHeader('Content-Type','application/json')
  //res.end(JSON.stringify(data)); //conveting JSON to string
  //res.end('<h1>Hello, This is a HTTP Server</h1>');
  res.end(index);
})

server.listen(8080);