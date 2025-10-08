const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware"); 
const {uploadImageController, fetchImageController, deleteImageController } = require("../controllers/imageController");


const router = express.Router();

router.post("/upload", authMiddleware, adminMiddleware, uploadMiddleware.single("image"), uploadImageController);

//now route for use of getting all images
router.get("/get", authMiddleware, fetchImageController);

//delete image route
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;