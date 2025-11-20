const requestLogger = (req, res, next) => {
    const timeStamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.get("User-Agent");
    console.log(`[${timeStamp}] ${method} ${url} - ${userAgent}`);
    next(); //need to call this, becasue whereever this method is used at end it will call next and next middleware or request will be call
};

//also add the timestamp
const addTimeStamp = (req, res, next) => {
    req.timeStamp = new Date().toISOString();
    next();
};

module.exports = {requestLogger, addTimeStamp};