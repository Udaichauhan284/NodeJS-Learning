const express = require("express");
const app = express();
const timerLog = (req,res,next) => {
    const timeStamp = new Date().toISOString();
    console.log(`${timeStamp} from ${req.method} too ${req.url}`);
    next();
}

//now i am using middleware
app.use(timerLog);

//now setting new 
app.get("/", (req, res) => {
    res.send("Welcome Home Page");
});

app.get("/about", (req, res)=> {
    res.send("Welcome to about page");
});

app.listen(3000, () => {
    console.log("Server is now running on port 3000");
});