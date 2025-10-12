const express = require("express");
const http = require("http");
const scoketio = require("socket.io");

//here i have created the app from express
const app = express();

//here i have created the server from app
const server = http.createServer(app);

//Initiate socket.io and attach this to the http server
const io = scoketio(server);

//now we need to target the static folder which is public in our case
app.use(express.static('public'));

//now we need to store the users
const users = new Set();

io.on("connection", (scoket) => {
    console.log("A User is not connected");

    //handle users when they will join the chat
    scoket.on("join", (username) => {
        users.add(username);
        scoket.username = username;

        //broadcast to all the users that a new user has joined
        io.emit("userJoined", username);

        //send the update user list to all clients
        io.emit("userList", Array.from(users));
    });

    //handle incomeing chat message
    scoket.on("chatMessage", (message) => {
        //boardcast the received message to all connected clients
        io.emit("chatMessage", message);
    });

    //handle user disconnection
    scoket.on("disconnect", () => {
        console.log("An user is disconnected: ", scoket.username);

        users.forEach((user) => {
            if(user === scoket.username){
                users.delete(user);

                io.emit("userLeft", user);
                io.emit("userList", Array.from(users));
            }
        });
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is now running on ${PORT}`);
});