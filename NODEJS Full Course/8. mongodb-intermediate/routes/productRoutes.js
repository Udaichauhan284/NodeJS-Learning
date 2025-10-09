const express = require("express");

const {insertSampleProducts, getProductStats, getProductAnalysis} = require("../controllers/productController");

const router = express.Router();

//now define the routes
router.post("/add", insertSampleProducts);
//now define the get request to get all the data which is aggregate
router.get("/stats", getProductStats);
router.get("/analysis", getProductAnalysis)

//now export the routes
module.exports = router;