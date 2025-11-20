//first import the dotenv and express and cors
require("dotenv").config();
const express = require("express");

const {configureCors} = require("./config/corsConfig");
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware");
const { globalErrorHandler } = require("./middleware/errorHandler");
const {urlVersioning} = require('./middleware/apiVersionong');
const { createBasicRateLimiter } = require("./middleware/rateLimiting");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCors());
app.use(createBasicRateLimiter(100, 15*60*1000)); //100 request per 15 minutes
app.use(express.json()); //express json middleware
app.use('/api/v1', urlVersioning("v1"));

app.use(globalErrorHandler);
app.listen(PORT, () => {
    console.log(`Server is running and listening on ${PORT}`);
});