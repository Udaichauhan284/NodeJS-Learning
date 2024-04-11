/*Server - A server is a person who communicates with clients
analogy - server is a waiter
and database is a cheif

A server is a computer program that's responsible for prepraing and delivering data to other computers.
webpages, images, videos or any additional information

JSON - Javascript Object notation
JSON is a bit like this organized format for ecahnging data between computers, JSON data mostly is in string.
so from string to JSON Obejct, we need to Parse it

JSON is a lightweight
Structed and orgainzed data
*/
const jsonString = '{"name":"udai", "age": 24}'
const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject);
// console.log(typeof jsonObject);

//now from json object to string, stingify
const json = JSON.stringify(jsonObject);
// console.log(json);
// console.log(typeof json);

/* What are APIs and EndPoints
-Imagine a menu card in a resturant
-Lost of options are there amd each of these options will give me different order.
-so this collection of list/option - MenuCard - API(application programmig interface).
-and these options are known as endpoints.
- and thw waiter(Server) only take those order whatever it is written on menu/endpoints, other wise it will give you 404 not found.

--> Create a server
-creating a server in nodejs by using express
- express is a ppopular framework for building web applications and APIs using Node js
- when you create a server using Express js, you are setting up the foundation for handling the incoming request and defing how your applicatioon will response to these requests.

- server === waiter
- waiter have some home, and we are creating server on our local computer, so for our own local server is "localhost" - port number.
*/

const express = require("express");
const app = express();

app.get("/", (req,res) => {
  console.log("Hello World");
  res.send("Welcome to my page");
});
app.get("/momos", (req,res)=>{
  res.send("You are seeing the Momos Page");
})
app.listen(3030, () =>{
  console.log("Server Is Running");
});