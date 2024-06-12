  import express from 'express';
  import dotenv from 'dotenv/config';
  import connectDB from './libs/dbConnect.js';
  import userRouter from './routes/user.route.js';
  import { errorHandler } from './libs/middleware.js';
  import cookieParser from 'cookie-parser';
  import cors from 'cors'; // Import the cors middleware

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

  app.use('/api/v1/users', userRouter);

  app.use('*', (req, res) => {
    res.status(404).json({ message: "not found" });
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
