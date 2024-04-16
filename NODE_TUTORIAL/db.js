/* == Database Connection ==
- Connect MongoDB with NodeJS
- The db.js file whihc we have created is essientially responsible for establishing a connection brtween your Nodejs application and your MongoDb database using the Mongoose Library.

*/
const mongoose = require('mongoose');

//connect to the MongoDB database using mongoose.connect() method. we can connect to a loaclly hosted database ot use a remote MOngoDB atlas database.
//this for remote coonection to MONGODB atlas.
mongoose.connect("mongodb+srv://udaichauhan284:7wiei0fEL5jOdqmg@cluster0.nsbdt1n.mongodb.net/hotel-dummy");

//access the deafult connection using mongoose.connection
const db = mongoose.connection;

//hanlde connection events
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
  console.log('Connected to MongoDB');
});
db.on('disconnected', ()=>{
  console.log('MongoDB disconnected');
});

//export the database connection
module.exports = db;
//so that i can use as nodejs application

/* What are modles or schema?
- models are like a blueprint of our database
- it's a representation of specific collection in MongoDb, like a person.
- once you have defines a model, you can CREATE READ, UPDATE and DELETE document in the corresponding MongoDB collection.
- mongoose allows you to define a schema for your documents. A schema is like a blueprint that defines the structure and data types of your documenst within a collection. 
*/