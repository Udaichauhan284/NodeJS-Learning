/*
Express is a routing and middleware web framework that has minimal functionality of its own: 
An express application is essentially a series of middleware function calls.

Middleware functions are functions that have 
access to the request obejct, the response 
object and the next middleware function in
the application's request-response cycle.
The next middleware function is commonly 
denoted by a variable named "next".

-> Middleware functions can perform the following tasks:
1. excute an code.
2. make changes to the request and response objects.
3. end the request-response cycle.
4. call the next middleware function in the stack.

If the current middleware functions doesnot
end the request-response cycle, it must call
next middleware to pass control to the next
middleware function. otherwise the request will be lest hanging.
*/

const express = require("express");

const app = express();

//create custom own middleware
const myFirstMiddleware = (req, res, next) => {
    console.log("this first middleware will run on every request");

    next(); //it will call next request-response cycle
};

//now i need to use the middleware
app.use(myFirstMiddleware);

//now create the basic routes
app.get("/", (req, res) => {
    res.send("Welcome Home Page");
});

app.get("/about", (req, res) => {
    res.send("Welcome to about page");
});

app.listen(3000, () => {
    console.log('Server is running on 3000');
});