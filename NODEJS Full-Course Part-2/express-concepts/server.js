//first import the dotenv and express and cors
require("dotenv").config();
const express = require("express");

const {configureCors} = require("./config/corsConfig");
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware");
const { globalErrorHandler } = require("./middleware/errorHandler");
const {urlVersioning} = require('./middleware/apiVersionong');
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15*60*1000)); //100 request per 15 minutes, making it to to check
app.use(express.json()); //express json middleware
app.use(urlVersioning("v1"));
app.use("/api/v1", itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running and listening on ${PORT}`);
});