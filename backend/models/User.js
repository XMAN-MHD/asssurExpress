import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  nom: {
    type: String,
    required: [true, 'Le champ Nom est obligatoire.'],
    minlength: [2, 'Le nom doit contenir au moins 2 caractères.'],
    maxlength: [50, 'Le nom doit contenir moins de 50 caractères.'],
  },
  prenom: {
    type: String,
    required: [true, 'Le champ Prénom est obligatoire.'],
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères.'],
    maxlength: [50, 'Le prénom doit contenir moins de 50 caractères.'],
  },
  telephone: {
    type: String,
    required: [true, 'Le champ Téléphone est obligatoire.'],
    // match: [/^(77|78|70|76|75)\d{7}$/, 'Le numéro de téléphone est invalide'],
    unique: [true, 'Le numéro telephone existe déja.'], // Assurez-vous que le numéro de téléphone est unique
    validate: {
        validator: (value) => /^(77|78|70|76|75)\d{7}$/.test(value),
        message: 'Le numéro de téléphone est invalide.'
    }
  },
  password: {
    type: String,
    required: [true, 'Le champ Mot de passe est obligatoire.'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.'],
    validate: {
        validator: (value) => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(value),
        message: 'Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial.'
    }
  },
  avatar: {
    type: String,
    default: '', // Set as empty string initially
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
