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
const db = require('./db');
const Person = require('./models/person');
//getting MenuItem
const MenuItem = require('./models/MenuItem');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json()); //it store inside req.body

app.use(express.json());

app.get("/", (req,res) => {
  console.log("Hello World");
  res.send("Welcome to my Hotel page");
});
app.get("/momos", (req,res)=>{
  res.send("You are seeing the Momos Page");
});

app.post("/person", async (req,res) => {
  // const data = req.body; 
  // //lets create a person type data
  // const newPerson = new Person(data);

  // //now save newPerson in database
  // newPerson.save((error, savePerson) => {
  //     if(error){
  //       console.log("Error while saving the person", error);
  //       res.status(500).json({error: "Internal server error"});
  //     }else {
  //       console.log('Data saved succesfully');
  //       res.status(200).json(savePerson);
  //     }
  // })

  //New Method - market standard
  try{
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data saved");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

//get method for getting all the person data
app.get("/person-data", async (req,res) => {
  try{
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

//POST method to add a Menu Item
app.post("/menu", async (req, res) => {
  try{
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Data Saved");
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error: "INternal Server Error"});
  }
});

//get the data
app.get("/menu", async (req,res) => {
  try{
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
})

app.listen(3030, () =>{
  console.log("Server Is Running");
});

/* What is body-parser
- bodyParser is a middlewware library for ExpressJS
- it is used to parse an extract the body of incoming HTTP requests.
- when a client(e.g a web browser or a mobile app) send data to a server, it. typically includes that data in the body of an HTTP request.
- this data can be in various format, such as JSON, form data or URL encoded data. bodyParser helps parse and extract this data from the request so that you can work with it in our Express js applications.
- bodyParser processes the request body before it reaches your route handlers, making the parsed data avaiable into the req body for further proceesing.
- bodyPaerser.json() automatically parses the JSON data from he request body and converts it into a JS object, which is then stored in the req.body.
*/

/* CRUD operation
CREATE, READ, UPDATE, DELETE

create -> POST
read -> GET
update -> PUT/PATCH
delete -> DELETE
*/