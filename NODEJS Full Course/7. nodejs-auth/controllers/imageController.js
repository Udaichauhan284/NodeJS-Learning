const Image = require("../models/Image");
const uploadedToCloudinary = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
    try {
        //check if file is missing in req object 
        if(!req.file){
            return res.status(400).json({
                success : false,
                message : "File is required. Please upload an image",
            });
        }

        //upload to cloudinary
        const {url, publicId} = await uploadedToCloudinary(req.file.path);

        //store the image url and public id along with the uploaded iser id
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy : req.userInfo.userId,
        });

        await newlyUploadedImage.save();

        res.status(201).json({
            success : true,
            message : "Imaged uploaded successfully",
            image : newlyUploadedImage,
        });
    }catch(e){
        console.error(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Please try again",
        });
    }
};

module.exports = uploadImageController;