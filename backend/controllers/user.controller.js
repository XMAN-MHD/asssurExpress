import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import jwt from 'jsonwebtoken';
import {Buffer} from 'buffer' 
import crypto from 'crypto';
import nodemailer from 'nodemailer';


// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or application-specific password
  },
});

// Register a new user
export const registerUser = async (req, res, next) => {

    // Validate and sanitize inputs
    await check('nom').escape().run(req);
    await check('prenom').escape().run(req);
    await check('telephone').escape().run(req);
    await check('password').escape().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Veuillez remplir les données correctement."});
    }

    // Extract data sent by the new user
    let { nom, prenom, telephone, password } = req.body;

    /* Remove spaces from the telephone number */
    telephone = telephone.replace(/\s/g, '');
  
    if (!nom || !prenom || !telephone || !password) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs." });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

    // Create avatar URL using Dicebear and user initials
    console.log("Creating avatar with initials:", `${prenom.charAt(0)}${nom.charAt(0)}`);
    const avatarSvg = createAvatar(initials, {
      seed: `${prenom.charAt(0)}${nom.charAt(0)}`, // Use initials
      // Additional options if needed
    }).toString();
    console.log("Avatar SVG:", avatarSvg);
    const avatarBase64 = `data:image/svg+xml;base64,${Buffer.from(avatarSvg).toString('base64')}`;

    // configure new userData
    const newUser = new User({
      nom,
      prenom,
      telephone,
      password: hashedPassword,
      avatar: avatarBase64
    });
  
    // save the new user into the DB
    const savedUser = await newUser.save();
    
    //Generate JWT
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    // send response to the frontend
    res.cookie('token', token, {
        httpOnly: true, // Cookie is not accessible via JavaScript
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      })
      .status(201)
      .json({
        _id: savedUser._id,
        nom: savedUser.nom,
        prenom: savedUser.prenom,
        telephone: savedUser.telephone,
        avatar: savedUser.avatar,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle Mongoose validation error
        const message = Object.values(error.errors).map(val => val.message).join(', ');
        return res.status(400).json({ message });
    } else if (error.code === 11000) {
        // Handle MongoDB unique constraint error
        if (error.keyValue && error.keyValue.telephone) {
            return res.status(400).json({ message: "Le numéro de téléphone existe déjà." });
        }
    }
      console.error("Error registering user:", error); // Log the detailed error 
      next({ status: 500, message: "Erreur interne du serveur." });
    }
  };
  

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    next({ status: 400, message: "mauvaise requette.", error: error.message });
  }
};

// Get a specific user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({message: "Utilisateur non trouvé." });
    }
    res.status(200).json(user);
  } catch (error) {
    next({ status: 400, message: "Erreur lors de la récupération de l'utilisateurs.",error: error.message });
  }
};

// log user in
export const logUser = async (req, res, next) => {
  try {
    // Validate and sanitize inputs
    await check('telephone').escape().run(req);
    await check('password').escape().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Veuillez remplir les données correctement."});
    }

    // Extract data sent by the new user
    let { telephone, password } = req.body;

    // check if user exists 
    const userExists = await User.findOne({telephone});
    if(!userExists)
    {
      return res.status(404).json({message: "Numero Téléphone introuvable."})
    }

    /* Remove spaces from the telephone number */
    telephone = telephone.replace(/\s/g, '');

    // if user is found compare the passwords to prevent from hacking
    const validPassword = await bcrypt.compare(password, userExists.password )
    if(!validPassword)
    {
      return res.status(401).json({message: "Mauvais mot de passe."})
    }

    //Generate JWT
    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    /// Send response with token in the body
    res.status(200).json({
      token, // Include the token in the response body
      _id: userExists._id,
      nom: userExists.nom,
      prenom: userExists.prenom,
      telephone: userExists.telephone,
      email: userExists.email,
      address: userExists.address,
      avatar: userExists.avatar,
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    next({ status: 500, message: "Utilisateur introuvable."});
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
    }
    if(updates.prenom && updates.nom)
    {
      const prenom = updates.prenom;
      const nom = updates.nom;

      // Create avatar URL using Dicebear and user initials
      console.log("Creating avatar with initials:", `${prenom.charAt(0)}${nom.charAt(0)}`);
      const avatarSvg = createAvatar(initials, {
        seed: `${prenom.charAt(0)}${nom.charAt(0)}`, // Use initials
        // Additional options if needed
      }).toString();
      console.log("Avatar SVG:", avatarSvg);
      updates.avatar = `data:image/svg+xml;base64,${Buffer.from(avatarSvg).toString('base64')}`;
    }

    // if user not own the data block it 
    if (req.user.id !== req.params.id) {
      return res.status(403).json({message: 'Accés interdit'});
    }
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    
    if (!user) {
      return res.status(404).json({message: "Utilisateur non trouvé." });
    }
    const { password, updatedAt, createdAt, ...rest } = user.toObject();
    res.status(200).json(rest);
  } catch (error) {
    next({ status: 500, message: "Erreur lors de la mise à jour de l'utilisateur.", error: error.message });
  }
};

// Request to forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email address
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' }); // User not found
    }

    // Generate a secure token for password reset
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token; // Set the reset token
    user.resetPasswordExpires = Date.now() + 3600000; // Set expiration time (1 hour from now)

    // Save the updated user document
    await user.save();

    // Create a URL for the password reset link
    const resetURL = `http://localhost:5173/reset-password/${token}`;
    const message = `Vous recevez cet e-mail parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation d'un mot de passe. Merci de faire votre demande via le lien suivant: \n\n ${resetURL}`;

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: email, // Recipient email address
      subject: 'Réinitialisation de Mot de Passe', // Subject of the email
      text: message, // Plain text body of the email
      // Alternatively, you can use `html` if you want to send HTML content
      // html: `<p>${message}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({ message: "Le mail est envoyé." });

  } catch (err) {
    // Handle errors, and respond with an error message
    console.error('Error processing forgot password request:', err);
    res.status(500).json({ message: "Le mail n'a pas pu être envoyé." });
  }
};

// Reset user password
export const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  try {
      const user = await User.findOne({
          resetPasswordToken: req.params.token,
          resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
          return res.status(400).json({ message: 'Jeton invalide ou expiré' });
      }

      if (password !== confirmPassword) {
          return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
      }

      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: 'Réinitialisation du mot de passe réussie' });

  } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe' });
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({message: 'Accés interdit'});
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next({ status: 404, message: "Utilisateur non trouvé." });
    }
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};
