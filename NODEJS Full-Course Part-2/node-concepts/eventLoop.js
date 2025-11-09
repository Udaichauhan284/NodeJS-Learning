/* 
Phases of Event Loops
Timers -> Pending callbacks -> idle, 
prepare -> poll -> check -> close callback

The event loop in Nodejs is a mechanism that allows asynchronous tasks to be handled efficently without blocking the excution of other operations. 
-> Executes JS synchronously first and then it process asynchronous operations.
-> Delegates heavy tasks like I/O operations, timers, and network request to the libuv library.
-> Ensures smooth execution of multiple operations by queuing and scheduling callbacks effciently.

==> How does work Event Loop Work? <==
When a Node.js application runs, the event loop starts process the synchronous code first, anf them moves to handle asyncrhonous tasks. The execution follows these steps:

1. Initialization
-> When Nodejs start, it loads the scripts, executes synchronous code, and registers any asynchronous tasks (e.g,. timers, I/O request, network operaitions).

*/

const fs = require("fs");
const crypto = require("crypto");

console.log("1. Script Starts Here Sync");

setTimeout(() => {
    console.log("2. setTimeout 0s callback (macrotask");
}, 0);

setTimeout(() => {
    console.log("3. setTimeout 0s callback (macrotask)");
}, 0);

setImmediate(() => {
    console.log("4. setImmediate callback (check)");
});

//now microtask queue method
Promise.resolve().then(() => {
    console.log("5. Promise resolved (microtask)");
});

process.nextTick(() => {
    console.log("6. process.nexttick callback (microtask)");
});

//now file readline operation, which will happen at last
fs.readFile(__filename, () => {
    console.log("7. file read operation (I/O callback)");
});

//now most heavy operation, which will happen at last
crypto.pbkdf2("secret", "salt", 1000, 64, "sha512", (err, key) => {
    if(err) throw err;
    console.log("8. pbkdf2 operations completed (CPU intensive task)");
});

console.log("9. script ends");


/*
Output
1. Script Starts Here Sync
9. script ends
6. process.nexttick callback (microtask)
5. Promise resolved (microtask)
2. setTimeout 0s callback (macrotask
3. setTimeout 0s callback (macrotask)
4. setImmediate callback (check)
7. file read operation (I/O callback)
8. pbkdf2 operations completed (CPU intensive task)
*/

