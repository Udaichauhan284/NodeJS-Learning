const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //console.log(authHeader); //this will print the Bearer and then token, so we need to spilt it.

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success : false,
            message : "Access denied. No token provided. Please login to continue."
        });
    }

    //now we have the token now decode it, to check if we have authenticated user
    try{
        const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodeTokenInfo);

        //now we have user info, pass in req and variable name
        req.userInfo = decodeTokenInfo;
        next();
    }catch(e){
        console.error(e);
        return res.status(500).json({
            success: false,
            message : "Error while loggin. Please wait!"
        });
    }
}

module.exports = authMiddleware;