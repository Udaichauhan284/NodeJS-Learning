const express = require("express");
const app = express();

//application level settings
app.set("view engine" , "ejs");

//routing
app.get("/", (req, res) => {
    res.send("Home Page");
});

//post request
app.post("/api/data", (req, res) => {
    res.json({
        message : "Data Received",
        data : req.body,
    });
});

//use of middleware, so for that we use "use" method
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something went wrong");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is now running at port ${port}`);
});