// imports
import express from 'express'; 
import {
    registerUser,
    getAllUsers, 
    getUser, 
    logUser,
    updateUser, 
    deleteUser,
} from '../controllers/user.controller.js'
import { verifyToken } from '../libs/middleware.js';

// create a router
const router = express.Router();

// define routes for the users
router.post('/signup', registerUser);
router.post('/signin', logUser);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUser);
router.patch('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);


export default router;
