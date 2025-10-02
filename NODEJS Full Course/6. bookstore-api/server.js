require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//connect to database, from calling folder's file
connectDB();

//middleware -> express json
app.use(express.json());

//now calling the routes from routes folder
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});