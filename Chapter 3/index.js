const fs = require("fs");
const express = require("express");
const data = JSON.parse(fs.readFileSync("./public/data.json", "utf-8"));
const products = data.products;

const server = express();
//BodyParser -- BuiltIn Middleware
//server.use(express.json()); //understandig the json data of body

//this is static hositing, so now you can direclty access the public folder from url doing /data.json
//server.use(express.static('public'));

//MiddleWare- Application Level
// server.use((req,res,next) => {
//   console.log(req.method, req.ip, new Date, req.hostname, req.get('User-Agent'));
//   next();
// })

//Router Level Middleware
const auth = (req, res, next) => {
  console.log(req.query);
  if (req.query.password === "123") {
    next();
  }
  // if(req.body.password === '123'){
  //   next();
  // }
  else {
    res.sendStatus(401); //not getting query
  }
};
//server.use(auth);
//You can also call auth direct in GET method

//END POINTS - APIs - Route
server.get("/", auth, (req, res) => {
  res.json({ type: "GET" });
});
server.post("/", auth, (req, res) => {
  res.json({ type: "POST" });
});
server.put("/", (req, res) => {
  res.json({ type: "PUT" });
});
server.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});
server.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

server.listen(8080);
