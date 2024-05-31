// import packages
import express from 'express';
import dotenv from 'dotenv/config'; // load the environment variables
import { db } from './libs/dbConnect.js';
import userRouter from './routes/user.route.js'
import { errorHandler } from './libs/middleware.js';

// create a server
const app = express();

// access the port 
const PORT = process.env.PORT || 5000; 

// middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// user router
app.use('/api/v1/users', userRouter);


// not found route 
app.use('*', (req, res) => {
    res.status(404).json({message: "not found"});
})

// error handler middleware always the last route
app.use(errorHandler);

// server listen 
app.listen(PORT, ()=>{ console.log(`server listen on port ${PORT}!`) });