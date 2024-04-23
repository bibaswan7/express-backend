import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { extractPublicId } from "../utils/ExtractPublicId.js";
import { ApiResponse } from "../utils/ApiResponse.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath){
            return null;
        }

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(localFilePath)
        return response;
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteImageFromCloudinary = async(imageUrl) => {
    try {
        const publicId = extractPublicId(imageUrl)
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    }
    catch(error) {
        console.log("Error during deletion: ", error);
    }
}

export {uploadOnCloudinary, deleteImageFromCloudinary}


