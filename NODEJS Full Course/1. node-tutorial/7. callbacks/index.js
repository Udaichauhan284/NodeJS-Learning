/* 
A callback is a function which is passed into another function as an argument, which
is then invoked inside the outer function to complete some kind of routine or action.

There are two ways in which the callbacks may be called: synchronous and asynchronous.
Synchronous callbacks are called immediately after the invocation of the outer function, 
with no intervening asynchronous tasks, while asynchronous callbacks are called at some point later, after an asynchronous
operation has completed.
*/

const fs = require("fs");

const person = (name, callbackFn) => {
    console.log(`This is my name ${name}`);
    //now calling the callback func
    callbackFn();
}
//Output of this person
//This is my name Udai Chauhan
//Gurgaon, India

function address(){
    console.log("Gurgaon, India");
}

//now passing the address function as callback into person
person("Udai Chauhan", address);

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if(err){
        console.error("Error while reading file: ", err);
        return;
    }
    console.log('Data from file: ', data);
})