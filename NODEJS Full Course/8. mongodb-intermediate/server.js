require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const bookRoutes = require("./routes/bookRoutes");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB is connected Successfully"))
.catch((e) => console.log(e));

const app = express();

//use the json middleware
app.use(express.json());

//now use the routes
app.use("/products", productRoutes);
app.use("/ref", bookRoutes);

//now connect the app to server
app.listen(process.env.PORT, () => {
    console.log(`Server is connected and running at ${process.env.PORT}`);
});