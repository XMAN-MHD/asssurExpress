import mongoose from 'mongoose';

const { Schema } = mongoose;

const insuranceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur est obligatoire.']
  },
  type: {
    type: String,
    enum: ['Assurance Papier', 'Assurance Digitale'],
    required: [true, 'Le type d\'assurance est obligatoire.']
  },
  company: {
    type: String,
    enum: ['Allianz', 'Askia', 'SAS', 'Amsa', 'AXA', 'Cnart', 'La providence', 'PA', 'Saar', 'Sanlam', 'Salama', 'SUNU'],
    required: [true, 'La compagnie d\'assurance est obligatoire.']
  },
  vehicleCategory: {
    type: String,
    enum: ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4', 'Catégorie 5'],
    required: [true, 'La catégorie du véhicule est obligatoire.']
  },
  vehiclePower: {
    type: Number,
    min: [1, 'La puissance du véhicule doit être au moins 1.'],
    max: [1000, 'La puissance du véhicule doit être au maximum 1000.'],
    required: [true, 'La puissance du véhicule est obligatoire.']
  },
  insuranceDuration: {
    type: Number,
    min: [1, 'La durée de l\'assurance doit être au moins 1 mois.'],
    max: [60, 'La durée de l\'assurance doit être au maximum 60 mois.'],
    required: [true, 'La durée de l\'assurance est obligatoire.']
  },
  vehicle: {
    registrationNumber: {
      type: String,
      required: [true, 'Le numéro d\'immatriculation est obligatoire.']
    },
    brand: {
      type: String,
      required: [true, 'La marque du véhicule est obligatoire.']
    },
    model: {
      type: String,
      required: [true, 'Le modèle du véhicule est obligatoire.']
    },
    firstRegistrationDate: {
      type: Date,
      required: [true, 'La date de première mise en circulation est obligatoire.']
    },
    energy: {
      type: String,
      enum: ['Essence', 'Diesel', 'Électrique', 'Hybride'],
      required: [true, 'Le type d\'énergie est obligatoire.']
    }
  },
  owner: {
    firstName: {
      type: String,
      required: [true, 'Le prénom du propriétaire est obligatoire.'],
      minlength: [2, 'Le prénom doit contenir au moins 2 caractères.'],
      maxlength: [50, 'Le prénom doit contenir moins de 50 caractères.']
    },
    lastName: {
      type: String,
      required: [true, 'Le nom du propriétaire est obligatoire.'],
      minlength: [2, 'Le nom doit contenir au moins 2 caractères.'],
      maxlength: [50, 'Le nom doit contenir moins de 50 caractères.']
    },
    phone: {
      type: String,
      required: [true, 'Le téléphone du propriétaire est obligatoire.'],
      validate: {
        validator: (value) => /^(77|78|70|76|75)\d{7}$/.test(value),
        message: 'Le numéro de téléphone est invalide.'
      }
    },
    address: {
      type: String,
      required: [true, 'L\'adresse du propriétaire est obligatoire.']
    }
  },
  photos: {
    registrationCardFront: {
      type: String,
      required: [true, 'La photo recto de la carte grise est obligatoire.']
    },
    registrationCardBack: {
      type: String,
      required: [true, 'La photo verso de la carte grise est obligatoire.']
    }
  },
  price: {
    type: Number,
    required: [true, 'Le prix de l\'assurance est obligatoire.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

insuranceSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Insurance = mongoose.model('Insurance', insuranceSchema);

export default Insurance;
