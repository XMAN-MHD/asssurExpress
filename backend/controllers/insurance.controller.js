import Insurance from '../models/Insurance.js';
import mongoose from 'mongoose';

// Calculate insurance price
export const calculateInsurancePrice = async (req, res) => {
  try {
    const { type, company, vehicleCategory, vehiclePower, insuranceDuration } = req.body;

    // Basic validation (you can enhance this as needed)
    if (!type || !company || !vehicleCategory || !vehiclePower || !insuranceDuration) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Example logic for calculating the insurance quote
    const baseRate = 100; // base rate for the insurance
    const typeMultiplier = type === 'Assurance Digitale' ? 1.1 : 1.0;
    const companyMultiplier = 1.0; // You can adjust this based on company
    const categoryMultiplier = {
      'Catégorie 1': 1.0,
      'Catégorie 2': 1.2,
      'Catégorie 3': 1.4,
      'Catégorie 4': 1.6,
      'Catégorie 5': 1.8,
    }[vehicleCategory] || 1.0;
    const powerMultiplier = vehiclePower / 100; // Adjust the formula as needed
    const durationMultiplier = insuranceDuration / 12; // Assuming base rate is for 1 year

    const price = baseRate * typeMultiplier * companyMultiplier * categoryMultiplier * powerMultiplier * durationMultiplier;

    res.status(200).json({price});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Create a new insurance
export const createInsurance = async (req, res, next) => {
    try {
        const  {
          type, 
          cost,
          company,
          category, 
          power, 
          insuranceDuration, 
          registrationNumber,
          brand,
          model,
          firstRegistrationDate,
          energy,
          firstName,
          lastName,
          phone,
          address,
        } = req.body;

        // gather the data about the vehicle: 
        const vehicle = {
          registrationNumber,
          brand,
          model,
          firstRegistrationDate,
          energy,
        };
        
        // gather the data about the owner: 
        const owner = {
          firstName,
          lastName,
          phone,
          address,
        };

        // Destruct the vehicle 
        const userId = req.user.id; // Assuming you have user info in req.user after verifying the token
        // calculate the insurance expiration
        const deliveranceDate = new Date();
        const expiration = new Date(deliveranceDate.setMonth(deliveranceDate.getMonth() + insuranceDuration));
        // Create the new insurance data
        const newInsurance = new Insurance({
            user: userId,
            type,
            company,
            vehicleCategory: category,
            vehiclePower: power,
            insuranceDuration,
            deliverance: new Date(),
            expiration,
            vehicle,
            owner,
            price: cost
        });

        // Save the new insurance data
        const savedInsurance = await newInsurance.save();

        // Send the response including the ID of the saved insurance
        res.status(201).json({
          insuranceId: savedInsurance._id,  // Include the ID in the response
          insurance: savedInsurance  // Include the entire saved insurance document if needed
      });
    } 
    catch (error) {
      console.error(error);
      next({ status: 500, message:  "Une erreur est survenue lors de la sauvegarde des données."});
    }
};

// Get all insurances for a user
export const getUserInsurances = async (req, res, next) => {
  try {
    const userId = req.user.id; // assuming the user ID is added to the request by middleware

    const insurances = await Insurance.find({ user: userId });
    res.status(200).json(insurances);
  } catch (error) {
    next({ status: 500, message: 'Erreur lors de la récupération des assurances.', error });
  }
};

// Get an insurance by ID
export const getInsuranceById = async (req, res, next) => {
  try {
    const insuranceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Numéro d'assurance invalide." });
    }

    const insurance = await Insurance.findById(insuranceId);

    if (!insurance) {
      return res.status(404).json({ message: 'Assurance introuvable.' });
    }

    res.status(200).json({ insurance });
  } catch (error) {
    next({ status: 500, message: "Erreur lors de la récupération de l'assurance.", error });
  }
};

// Update an insurance
export const updateInsurance = async (req, res, next) => {
  try {
    const insuranceId = req.params.id;
    const updateData = req.body;

    // Check the data first
    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Numéro d'assurance invalide." });
    }

    // Find the existing insurance
    const existedInsurance = await Insurance.findById(insuranceId);
    if (!existedInsurance) {
      return res.status(404).json({ message: 'Assurance introuvable.' });
    }

    // Handle deliverance and expiration date updates
    if (updateData.insuranceDuration && updateData.deliverance) {
      const deliveranceDate = new Date(updateData.deliverance);
      const expiration = new Date(deliveranceDate);
      expiration.setMonth(deliveranceDate.getMonth() + updateData.insuranceDuration);
      updateData.expiration = expiration;
    } else if (updateData.insuranceDuration) {
      const deliveranceDate = new Date(existedInsurance.deliverance);
      const expiration = new Date(deliveranceDate);
      expiration.setMonth(deliveranceDate.getMonth() + updateData.insuranceDuration);
      updateData.expiration = expiration;
    }

    // Handle the new insurance price 
    if(updateData.vehicleCategory || updateData.vehiclePower || updateData.insuranceDuration)
    {  
      const type ='Assurance Digitale'; 
      const baseRate = 100; // base rate for the insurance
      const typeMultiplier = type === 'Assurance Digitale' ? 1.1 : 1.0;
      const companyMultiplier = 1.0; // You can adjust this based on company
      const categoryMultiplier = {
        'Catégorie 1': 1.0,
        'Catégorie 2': 1.2,
        'Catégorie 3': 1.4,
        'Catégorie 4': 1.6,
        'Catégorie 5': 1.8,
      }[updateData.vehicleCategory] || 1.0;
      const powerMultiplier = updateData.vehiclePower / 100; // Adjust the formula as needed
      const durationMultiplier = updateData.insuranceDuration / 12; // Assuming base rate is for 1 year
      const price = baseRate * typeMultiplier * companyMultiplier * categoryMultiplier * powerMultiplier * durationMultiplier;
      updateData.price = price;
    }

    // Perform the update
    const updatedInsurance = await Insurance.findByIdAndUpdate(insuranceId, updateData, { new: true });
    if (!updatedInsurance) {
      return res.status(404).json({ message: 'Assurance introuvable.' });
    }

    // Update successfully !
    res.status(200).json({ message: 'Assurance mise à jour avec succès.', insurance: updatedInsurance });
  } 
  catch (error) {
    next({ status: 500, message: "Erreur lors de la mise à jour de l'assurance.", error });
  }
};

// Delete an insurance
export const deleteInsurance = async (req, res, next) => {
  try {
    const insuranceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Numéro d'assurance invalide."  });
    }

    const deletedInsurance = await Insurance.findByIdAndDelete(insuranceId);

    if (!deletedInsurance) {
      return res.status(404).json({ message: 'Assurance supprimée avec succès.' });
    }

    res.status(200).json({ message: 'Assurance supprimée avec succès.' });
  } catch (error) {
    next({ status: 500, message: "Erreur lors de la suppression de l'assurance.", error });
  }
};
