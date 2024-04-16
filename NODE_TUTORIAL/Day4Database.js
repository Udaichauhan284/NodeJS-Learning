/*Database
Database typically have their own server system to manage and provide access to the data they store.
These database server systems are separates from Node.js servers but work together to create dynamic and dara-driven web applications.

-> Node js Server and Database Server
- A database server is a specialized computer program or system that manages databases. It stores, retrieves and manages data efficiently.
- The database server stores our appliction's data. When your Node.js server needs data, it sends request to the database server, which then retrieves and sends the requested data back to the Nodejs server.

- Nodejs server is responsible for handling HTTP requests from clients (like web browsers) and returing response.
- It processes these requests, commuincates with the database server, and sends data to clients. 
*/

// Connect MongoDB with NodeJS
/* now, to connect MOngoDB with NodeJS we need a MongoDB driver ( a set of programs)
- A mongoDB driver is essential when connecting NodeJS with MongoDB because it acts as a bridge between your nodejs application and the MongoDb databases.
- MongoDb speaks its own language (protocol) to interact with the databases server.
- NodeJS communicates in JS.
- The drier translates the JS code from Nodejs into a format that mongoDB can understanf and vice versa.
- The driver provides a set of functions and method that make it easier to perform common databases operations from your NODEJS code.
- The driver heps you handle errors that might occur during database interactions, it provides error codes,description and other details to help you troubleshoot issues.

--> npm install mongodb ---- this is most popular driver.

but mostly we use - mongoose - most popular, and here it is easy to use, because in mongodb, we need to implement a lot of things, but in mongoose things can be simple. and easy to implement.
*/