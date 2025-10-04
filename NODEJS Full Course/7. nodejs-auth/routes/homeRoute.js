const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//Now we protect this route using the auth middleware, and pass middleware between route and req, res that will check and make next to this route.
router.get("/welcome", authMiddleware, (req, res) => {
    //Now we are using the authMiddleware, and in that after checking the user, we are passing the info, so take that info here
    const {username, userId, role} = req.userInfo;

    res.status(200).json({
        message : "Welcome to Home Page",
        user : {
            _id : userId,
            username,
            role,
        }
    });
});

module.exports = router;
