/*
-> Callback Hell (Pyramid of Doom)
When multiple asynchronous operaions depend on each other, callbacks get deeply nested, making the code hard to read and maintain.

Callback hell in JS can be defined as the situation where we have nested callbacks(functions passed as arguments to other function) which makes the code diffcult to read and debug. The term "callback hell" describe the deep nesting of functions that can result in poor code 
readbility and diffcult in debugging, especially when handling multiple asynchronous operations.
*/

function task1(callback){
    setTimeout(() => {
        console.log("Task one completed");
        callback();
    },);
}

function task2(callback){
    setTimeout(() => {
        console.log("Task two completed");
        callback();
    },);
}

// task1(function(){
//     task2(function(){
//         console.log("Both are completed");
//     })
// })

//Now Callback example in NodeJS env

const fs = require("fs");
fs.readFile("input.txt", "utf-8", (err, data) => {
    if(err){
        console.error("Error while reading the file: ", err);
        return;
    }
    console.log("Data from file: ", data);

    //now in this callback i will modified the data and write the data into new file and read from that too

    const modifiedData = data.toUpperCase();

    //now write this data in new file
    fs.writeFile("output.txt", modifiedData, (err) => {
        if(err){
            console.error("Error writing file: ", err);
            return;
        }

        console.log("Data is written to the new file");

        //now i want to read from this created file
        fs.readFile("output.txt", "utf-8", (err, data) => {
            if(err){
                console.error("Getting error while reading: ", err);
                return;
            }

            console.log("Data from new file: ", data);
        });
    });
});