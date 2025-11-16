//first import the dotenv and express and cors
require("dotenv").config();
const express = require("express");

const {configureCors} = require("./config/corsConfig");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(configureCors());
app.use(express.json()); //express json middleware


app.listen(PORT, () => {
    console.log(`Server is running and listening on ${PORT}`);
});