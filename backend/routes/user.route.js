// imports
import express from 'express'; 
import {
    getAllUsers, 
    getUser, 
    updateUser, 
    deleteUser,
} from '../controllers/user.controller.js'

// create a router
const router = express.Router();

// define routes for the users
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.patch('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
