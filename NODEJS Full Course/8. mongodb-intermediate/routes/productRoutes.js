const express = require("express");

const {insertSampleProducts, getProductStats} = require("../controllers/productController");

const router = express.Router();

//now define the routes
router.post("/add", insertSampleProducts);
//now define the get request to get all the data which is aggregate
router.get("/stats", getProductStats);

//now export the routes
module.exports = router;