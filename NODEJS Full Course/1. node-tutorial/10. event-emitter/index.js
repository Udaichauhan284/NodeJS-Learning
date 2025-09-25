/*
The EventEmitter class in NodeJS is a core module that provides a way to handle 
asynchronous events. It allows object to 
emit events and other objects to listen 
and respond to those events.

Event Emitter in Node
NodeJS uses an events module to create and handle custom events. The EventEmitter class
can be used to create and handle a custom
events module.
*/

const EventEmitter = require("events");

const myFirstEmitter = new EventEmitter();

//register a listener
myFirstEmitter.on("greet", (name) => {
    console.log(`Hello ${name}`);
});

//now i want to emit the data of this listener
myFirstEmitter.emit("greet", "Udai Chauhan");