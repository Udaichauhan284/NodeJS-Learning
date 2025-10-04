//here we use the controller to access in routes
const express = require("express");
const {registerUser, loginUser} = require("../controllers/authController");

//now use the router from express
const router = express.Router();

//all routes are related to authentication and authorization
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;