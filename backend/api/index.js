import express from 'express';
require('dotenv').config; // load the environmental variable
import connectDB from '../libs/dbConnect.js';
import userRouter from '../routes/user.route.js';
import insuranceRoutes from '../routes/insurance.route.js';
import cloudinaryRouter from '../routes/cloudinary.route.js';
import { errorHandler } from '../libs/middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors middleware
import fileUpload from 'express-fileupload'; // middleware to upload files with express

// Connect to the database
connectDB();

// Star our express server
const app = express();

// Port of the server
const PORT = process.env.PORT || 5000;

// Allow server to access data sent inside req.body through a form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow the communication between the frontend and backend 
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests from the specified origin
  credentials: true // Enable credentials support
}));

// Enable cookie parser middleware
app.use(cookieParser());

// Middleware for handling file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

// Routes
app.use('/users', userRouter);
app.use('/insurances', insuranceRoutes);
app.use('/cloudinary', cloudinaryRouter);

// Test route
app.use('/test',(req, res) => {
    res.status(500).json({ message: "Server is running" });
});

// Not found route
app.use('*', (req, res) => {
  res.status(404).json({ message: "not found" });
});




// Error handler middleware
app.use(errorHandler);

// Server is listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

export default app;
