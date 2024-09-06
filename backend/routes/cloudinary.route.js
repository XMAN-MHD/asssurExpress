import express from 'express';
import { uploadImage } from '../controllers/cloudinary.controller.js';
import { verifyToken } from '../libs/middleware.js';

const router = express.Router(); 

router.post('/uploadImage',verifyToken, uploadImage);

export default router;
