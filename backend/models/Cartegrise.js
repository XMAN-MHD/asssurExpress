import mongoose from 'mongoose';

const { Schema } = mongoose;

const carteGriseSchema = new Schema({
  insurance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance',
    required: [true, 'La voiture est obligatoire.']
  },
  registrationCardFront: {
    type: String,
    required: [true, 'La photo recto de la carte grise est obligatoire.']
  },
  registrationCardBack: {
    type: String,
    required: [true, 'La photo verso de la carte grise est obligatoire.']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const CarteGrise = mongoose.model('CarteGrise', carteGriseSchema);

export default CarteGrise;
