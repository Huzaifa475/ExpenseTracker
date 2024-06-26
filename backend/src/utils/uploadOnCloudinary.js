import { v2 as cloudinary} from "cloudinary"; //cloudinary is a service on which images and the videos are uploaded
import fs from 'node:fs'; //Node module used to perform operations on the file 

cloudinary.config({
    cloud_name: "huzaifa47",
    api_key: "799792182953718",
    api_secret: "QmU-378W7UcgXYvkjvlV7IXApbw"
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        //If localFilePath is not exist
        if(!localFilePath) return null;
        //If exists
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        //If the file get corrupt remove form the local server
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export {uploadOnCloudinary}