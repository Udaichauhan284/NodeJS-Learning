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

2. Execution of Input Script
-> The call stack executes synchronous code first.
-> Any asynchronous operation (setTimeout, fs.readFile, network requests) are delegated to libuv.

3. Handles Asynchronous Operations with libuv
-> Nodejs uses a special C library called libuv to handle async operations. This library manages a thread pool that offloads
heavy tasks (like file I/O, database operations, or network requests) that woulf otherwise block the event loop.

4. Callback Execution
Once the thread pool commpletes its tasks, it sends callbacks to the events queue. The event loop processes these callbacks, but only when call stack is empty (i.e when no synchronous code is currently executing).

5. Event Loop Phases
The event loop goes through multiple phases, each designed to handle a different set of 
operations. It checks for events handles 
asynchronous callbacks, and executes tasks in 
the correct order.

6. Callback Execution from Event Queue
After call stack is empty, the event loop
picks tasks from the event queue and sends them to the call stack for execution. These tasks could include: 
-> completion networke request
-> processing I/O events.
-> Handling timers like setTimeout or setInterval.

==> Phases of Event Loop
The event loop in Node.js consists of several phases, each of which performs a specific task. These phases include:
1. Timers Phase
-> this phase processes timers that have been set using setTimeout() and setInterval().
console.log(start);
setTimeout(()=> console.log("hello"), 2000);
console.log("end");
-> setTimeout() schedules a callback to run after 2000 milliseconds.
-> the event loop processes this callback in the timers phase after the synchronous code has executed.

2. Pending Callbacks
This phase executes I/O-related callbacks that were deferred from the previous loop cycle.
console.log(start);
setImmediate(() => {console.log('immediate callback')});
console.log(end);
-> setImmediate() schedule a callback to run immediately after the current event loop cycle.
-> the event loop processes this callback in the pending callbacks phase.


3. Idle, Prepare (internal use only)
this phase is used internally by nodejs for background tasks.

4. Poll Phase(Main Phase)
-> this poll phase executes most of the tasks like - I/O, file reading, HTTP requests and much more.
const fs = require('fs');
const readStream = fs.createReadStream('./file.txt');
console.log(start);
readStream.on('data',(chunk)=>{
    console.log(chunk.toString())});
    console.log(end);
// answer
Start
End
File read complete

-> fs.readFile() initiates an asynchronous file read operations.
-> the callback is added to the poll phase and executed once the file read is complete.

5. Check phase
this phase prcoess any setImmediate() callbacks that have been added to the message queue.
console.log(start);
setImmediate(()=>console.log(call now));
console.log(end);

-> setImmediate() schedules a callback to run immedidately after the poll phase.
-> the event loop processes this callback in the check phase.

6. Close Callbacks Phase
-> This phase executes callbacks for closed connections like sockets, streams and event emitters.
The server listens for incoming connections.
When a socket is closed, the 'close' event is emitted, and the corresponding callback is executed in the close callbacks phase.


=> process.nextTick() and Promises in the Event Loop
-> Apart from these phases there is also process.nextTick() and promise callback whcih has the highest piority in the event loop. It 
executes after every phase before moving to the next phase.
-> process.nextTick() callbacks are always executed before the event loop moves to the next phase.
-> resolved Promise callbacks are prcoessed imeediately after process.nextTick();

setImmediate(() => {
    console.log(setImmedidate is called)});

Promise.resolve("Promise is done").then(console.log);;

setTimeout(() => c.log(time function is called));

process.nextTick(() => console.log(process.nextTick()));

//output
process.nextTick;
promise is resolved
time function is called
setImmdiate is called.

process.nextTick() executes before moving to the next phase.
resolved promises execute right after process.nextTick()
setTimeout() executes in the timers phase.
setImmediate() executed in the check phase.
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




