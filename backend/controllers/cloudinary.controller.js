import { unlinkSync } from 'fs';
import { uploadImageToCloudinary, getImageFromCloudinary, deleteImageFromCloudinary } from '../models/cloudinary.js';
import Insurance from '../models/Insurance.js';
export const uploadImage = async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded' });
      }
  
      const uploadedFile = req.files.image;
      const result = await uploadImageToCloudinary(uploadedFile.tempFilePath, 'assurExpress');
  
      // Extracting the URL and public_id from Cloudinary's response
      const { secure_url: imageUrl, public_id } = result;
  
      // Optionally, delete the temporary file
      unlinkSync(uploadedFile.tempFilePath);
  
      // Here, you would store the imageUrl and public_id in your database
      
      res.json({ imageUrl, public_id });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ message: 'Failed to upload image' });
    }
};

// New method to retrieve an image from Cloudinary
export const getImage = async (req, res) => {
  try {
    let { publicId } = req.params;
    // publicId = `assurExpress/${publicId}`;
    const image = await getImageFromCloudinary(publicId);
    res.json(image.url);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ message: 'Failed to retrieve image' });
  }
};

//  delete image from cloudinary
export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params; // Extract the publicId from the route parameters

    if (!publicId) {
      return res.status(400).json({ message: 'No publicId provided' });
    }

    const result = await deleteImageFromCloudinary(publicId);

    if (result.result === 'not found') {
      return res.status(404).json({ message: 'Image not found in Cloudinary' });
    }

    res.json({ message: 'Image deleted successfully', result });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};
