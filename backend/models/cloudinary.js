import cloudinary from '../libs/cloudinaryConfig.js';

export const uploadImageToCloudinary = async (filePath, folder) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder || 'assurExpress',
      });
      return result;
    } catch (error) {
      throw new Error('Failed to upload image to Cloudinary');
    }
};
  

// New method to retrieve image information from Cloudinary
export const getImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return result;
  } catch (error) {
    throw new Error('Failed to retrieve image from Cloudinary');
  }
};

// delete an image from cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};
