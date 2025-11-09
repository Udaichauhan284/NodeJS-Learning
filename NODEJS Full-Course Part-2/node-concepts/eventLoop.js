/* 
Phases of Event Loops
Timers -> Pending callbacks -> idle, 
prepare -> poll -> check -> close callback

The event loop in Nodejs is a mechanism that allows asynchronous tasks to be handled efficently without blocking the excution of other operations. 
-> Executes JS synchronously first and then it process asynchronous operations.
-> Delegates heavy tasks like I/O operations, timers, and network request to the libuv library.
-> Ensures smooth execution of multiple operations by queuing and scheduling callbacks effciently
*/