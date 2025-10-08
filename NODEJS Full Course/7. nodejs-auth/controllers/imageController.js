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

const fetchImageController = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1)*limit;

        //now sort the by crreateAt
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if(images){
            res.status(200).json({
                success : true,
                currentPage : page,
                totalPages : totalPages,
                totalImages : totalImages,
                data : images,
            });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Please try again",
        });
    }
};

const deleteImageController = async (req, res) => {
    try{
        //get the current Image Id
        const getCurrentImageId = req.params.id;
        const userId = req.userInfo.userId;

        //find the image from db
        const image = await Image.findById(getCurrentImageId);

        if(!image){
            return res.status(404).json({
                success : false,
                message : "Image Not Found",
            });
        }

        //check if this image is uploaded by current user who is trying to delete this image is uploaded by same or not
        if(image.uploadedBy.toString() !== userId){
            //403 is for request resouces is forbidden
            return res.status(403).json({
                success : false,
                message : "Your are not authorized to delete this image because you have not uploaded the same",
            });
        }

        //now delete the image after check from cloudinary storage
        await cloudinary.uploader.destroy(image.publicId);

        //now delete from mongodb also
        await Image.findByIdAndDelete(getCurrentImageId);

        res.status(200).json({
            success : true,
            message : "Image deleted successfully",
        });

    }catch(e){
        console.error(e);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Please try again",
        });
    }
};

module.exports = {
    uploadImageController,
    fetchImageController,
    deleteImageController
};