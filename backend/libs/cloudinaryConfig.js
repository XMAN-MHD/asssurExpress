import { config as dotenvConfig } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenvConfig(); // Load .env file

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
