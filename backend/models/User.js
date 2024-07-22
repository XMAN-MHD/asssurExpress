import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the user schema with various fields and their validation rules
const userSchema = new Schema({
  // Nom field: Required, with a minimum length of 2 and maximum length of 50 characters
  nom: {
    type: String,
    required: [true, 'Le champ Nom est obligatoire.'], // Required field with custom error message
    minlength: [2, 'Le nom doit contenir au moins 2 caractères.'], // Minimum length validation with custom error message
    maxlength: [50, 'Le nom doit contenir moins de 50 caractères.'], // Maximum length validation with custom error message
  },
  // Prenom field: Required, with a minimum length of 2 and maximum length of 50 characters
  prenom: {
    type: String,
    required: [true, 'Le champ Prénom est obligatoire.'], // Required field with custom error message
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères.'], // Minimum length validation with custom error message
    maxlength: [50, 'Le prénom doit contenir moins de 50 caractères.'], // Maximum length validation with custom error message
  },
  // Telephone field: Required, unique, and must match the specified regex pattern
  telephone: {
    type: String,
    required: [true, 'Le champ Téléphone est obligatoire.'], // Required field with custom error message
    unique: [true, 'Le numéro telephone existe déjà.'], // Unique field with custom error message
    validate: {
      validator: (value) => /^(77|78|70|76|75)\d{7}$/.test(value), // Custom validation function with regex pattern
      message: 'Le numéro de téléphone est invalide.', // Custom error message for validation
    },
  },
  // Password field: Required, with a minimum length of 6 characters and custom validation for complexity
  password: {
    type: String,
    required: [true, 'Le champ Mot de passe est obligatoire.'], // Required field with custom error message
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.'], // Minimum length validation with custom error message
    validate: {
      validator: (value) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(value), // Custom validation function for password complexity
      message: 'Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial.', // Custom error message for validation
    },
  },
  // Avatar field: Optional, with a default value of an empty string
  avatar: {
    type: String,
    default: '', // Set as empty string initially
  },
  // Email field: Optional, with a default value of an empty string and custom validation for email format
  email: {
    type: String,
    default: '', // Set as empty string initially
    validate: {
      validator: (value) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value), // Custom validation function for email format
      message: 'Le format de l\'email est invalide.', // Custom error message for validation
    },
  },
  // resetPasswordToken field: Optional, for storing password reset token
  resetPasswordToken: {
    type: String,
  },
  // resetPasswordExpires field: Optional, for storing expiration time of the reset token
  resetPasswordExpires: {
    type: Date,
  },
  // CreatedAt field: Automatically set to the current date when a document is created
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // UpdatedAt field: Automatically set to the current date whenever a document is updated
  updatedAt: {
    type: Date,
  },
});

// Pre-save middleware to update the updatedAt field before saving the document
userSchema.pre('save', function (next) {
  this.updatedAt = new Date(); // Update the updatedAt field to the current date
  next(); // Proceed to the next middleware or save operation
});

// Create the User model using the userSchema
const User = mongoose.model('User', userSchema);

export default User;
