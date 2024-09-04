import mongoose from 'mongoose';

const { Schema } = mongoose;

const registrationCardSchema = new Schema({
  insuranceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Insurance',
    required: [true, 'La voiture est obligatoire.']
  },
  registrationCardFront: {
    cloudinaryID:{
      type: String,
      require: [true, "Le ID de cloudinary est obligatoire"]
    },
    imageUrl:  {
      type: String,
      required: [true, 'La photo recto de la carte grise est obligatoire.']
    }
  },
  registrationCardBack: {
    cloudinaryID:{
      type: String,
      require: [true, "Le ID de cloudinary est obligatoire"]
    },
    imageUrl:  {
      type: String,
      required: [true, 'La photo verson de la carte grise est obligatoire.']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Pre-save middleware to update the updatedAt field before saving the document
registrationCardSchema.pre('save', function (next) {
  this.updatedAt = new Date(); // Update the updatedAt field to the current date
  next(); // Proceed to the next middleware or save operation
});

// Create the model
const registrationCard = mongoose.model('registrationCard', registrationCardSchema);

export default registrationCard;
