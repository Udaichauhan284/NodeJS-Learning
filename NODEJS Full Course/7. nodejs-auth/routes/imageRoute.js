const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const uploadImageController = require("../controllers/imageController");

const router = express.Router();

router.post("/upload", authMiddleware, adminMiddleware, uploadMiddleware.single("image"), uploadImageController);

module.exports = router;