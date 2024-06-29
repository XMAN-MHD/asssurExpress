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
export const createInsurance = async (req, res) => {
    try {
        const { type, company, vehicleCategory, vehiclePower, insuranceDuration, vehicle, owner, photos } = req.body;
        const userId = req.user.id; // Assuming you have user info in req.user after verifying the token

        // Calculate the insurance price
        const baseRate = 100;
        const typeMultiplier = type === 'Assurance Digitale' ? 1.1 : 1.0;
        const companyMultiplier = 1.0;
        const categoryMultiplier = {
            'Catégorie 1': 1.0,
            'Catégorie 2': 1.2,
            'Catégorie 3': 1.4,
            'Catégorie 4': 1.6,
            'Catégorie 5': 1.8,
        }[vehicleCategory] || 1.0;
        const powerMultiplier = vehiclePower / 100;
        const durationMultiplier = insuranceDuration / 12;

        const price = baseRate * typeMultiplier * companyMultiplier * categoryMultiplier * powerMultiplier * durationMultiplier;

        const newInsurance = new Insurance({
            user: userId,
            type,
            company,
            vehicleCategory,
            vehiclePower,
            insuranceDuration,
            vehicle,
            owner,
            photos,
            price
        });

        const savedInsurance = await newInsurance.save();
        res.status(201).json(savedInsurance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Get all insurances for a user
export const getUserInsurances = async (req, res, next) => {
  try {
    const userId = req.user.id; // assuming the user ID is added to the request by middleware

    const insurances = await Insurance.find({ user: userId });
    res.status(200).json({ insurances });
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

    if (!mongoose.Types.ObjectId.isValid(insuranceId)) {
      return res.status(400).json({ message: "Numéro d'assurance invalide." });
    }

    const updatedInsurance = await Insurance.findByIdAndUpdate(insuranceId, updateData, { new: true });

    if (!updatedInsurance) {
      return res.status(404).json({ message: 'Assurance introuvable.' });
    }

    res.status(200).json({ message: 'Assurance mise à jour avec succès.', insurance: updatedInsurance });
  } catch (error) {
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
      return res.status(404).json({ message: 'Assurance introuvable.' });
    }

    res.status(200).json({ message: 'Assurance supprimée avec succès.' });
  } catch (error) {
    next({ status: 500, message: "Erreur lors de la suppression de l'assurance.", error });
  }
};
