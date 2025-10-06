require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/authRoutes");
const homeRoute = require("./routes/homeRoute");
const adminRoute = require("./routes/adminRoute");
const uploadImageRoutes = require("./routes/imageRoute");

const app = express();

//now connect with database, call the connectToDb function
connectToDb();

//now use the json middleware
app.use(express.json());

//now use all the routes which we have created in routes and controller
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoute);
app.use("/api/admin", adminRoute);
app.use("/api/image", uploadImageRoutes);


//now start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


/*
===> Authentication Vs Authorization <===

-> Authentication is the process of verfiying the identity of a user or a system to ensure they are who they are claim to be.
    a) It typically involves creadentials such as username, passwords, one-time passwords (OTP), or biometric methods like
fingerprints and face recognition.
    b) By validating these credentials, authentication prevents unauthorized access and helps proctect sensitive systems and data from security breaches.


-> Authorization is the process of determining and granting access rights to an authenticated user or system.
    a) It defines what resources a user can access and what actions they are allowed to perform.
    b) Authorization always occurs after authentication and ensures the only permitted users can perform specific tasks, thereby enforcing security polices and protecting sensitive resources.
*/