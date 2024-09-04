import { unlinkSync } from 'fs';
import { uploadImageToCloudinary, getImageFromCloudinary, deleteImageFromCloudinary } from '../models/cloudinary.js';
import RegistrationCard from '../models/registrationCard.js';

// Upload registration card photos
export const uploadImage = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded' });
    }

    // Handle recto register card photo
    let imageUrlRecto, publicIdRecto;
    if (req.files.rectoPhoto) {
      const rectoPhoto = req.files.rectoPhoto;
      const resultRectoPhoto = await uploadImageToCloudinary(rectoPhoto.tempFilePath, 'assurExpress');

      // Extract the URL and public_id from Cloudinary's response
      imageUrlRecto = resultRectoPhoto.secure_url;
      publicIdRecto = resultRectoPhoto.public_id;

      // Optionally, delete the temporary file
      try {
        unlinkSync(rectoPhoto.tempFilePath);
      } catch (err) {
        console.error('Error deleting temp file:', err);
      }
    }

    // Handle verso register card photo
    let imageUrlVerso, publicIdVerso;
    if (req.files.versoPhoto) {
      const versoPhoto = req.files.versoPhoto;
      const resultVersoPhoto = await uploadImageToCloudinary(versoPhoto.tempFilePath, 'assurExpress');

      // Extract the URL and public_id from Cloudinary's response
      imageUrlVerso = resultVersoPhoto.secure_url;
      publicIdVerso = resultVersoPhoto.public_id;

      // Optionally, delete the temporary file
      try {
        unlinkSync(versoPhoto.tempFilePath);
      } catch (err) {
        console.error('Error deleting temp file:', err);
      }
    }

    // Check if at least one image was uploaded successfully
    if (!imageUrlRecto && !imageUrlVerso) {
      return res.status(400).json({ message: "Échec du téléversement. Veuillez réessayer." });
    }

    // Here, you would store the image URLs and public IDs in your database 
    const registrationCard = {
      insuranceID: req.body.insuranceID,
      registrationCardFront: {
        cloudinaryID: publicIdRecto,
        imageUrl: imageUrlRecto
      },
      registrationCardBack: {
        cloudinaryID: publicIdVerso,
        imageUrl: imageUrlVerso
      }, 
    };
    try {
      const newRegistrationCard = new RegistrationCard(registrationCard);
      await newRegistrationCard.save();
    } 
    catch (error) {
      console.log(error);
      res.json({status: 500, message: "Erreur lors de l'enregistrement de la carte grise dans la base de données."})
    }

    // Send a response to the frontend
    res.json({
      imageURLs: { recto: imageUrlRecto, verso: imageUrlVerso },
      publicIDs: { recto: publicIdRecto, verso: publicIdVerso },
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: "Une erreur est survenue lors du téléchargement des fichiers." });
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
