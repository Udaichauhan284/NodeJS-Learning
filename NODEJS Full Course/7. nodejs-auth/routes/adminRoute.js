const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
    res.json({
        message : "Welcome to Admin Home Page",
        user : {
                _id : req.userInfo.userId,
                username : req.userInfo.username,
                role : req.userInfo.role

            }
    });
});

module.exports = router;