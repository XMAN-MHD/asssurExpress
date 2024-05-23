// import packages
import express from 'express';
import dotenv from 'dotenv/config'; // load the environment variables
import { db } from './libs/dbConnect.js';

// create a server
const app = express();

// access the port 
const PORT = process.env.PORT || 5000; 

// home route
app.use('/', (req, res) => {
    res.status(404).json({message: "home page"});
})


// not found route always the last route
app.use('*', (req, res) => {
    res.status(404).json({message: "not found"});
})

// server listen 
app.listen(PORT, ()=>{ console.log(`server listen on port ${PORT}!`) });