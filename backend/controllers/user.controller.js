// imports
import {db} from '../libs/dbConnect.js';
import { ObjectId, ReturnDocument } from 'mongodb';


// access the user collection
const userCollection = db.collection('users');

// get all the users 
export const getAllUsers = async(req, res, next) => {
    try {
        const users =  await userCollection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        next({status: 400, error});
    }
};

// get a specific user
export const getUser = async(req, res, next) => {
    try {
        const query = {
            _id: new ObjectId(req.params.id)
        }
        const user =  await userCollection.findOne(query);
        if (!user) {
            return next({status: 404, message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        next({status: 400, error});
    }
};

// update user
export const updateUser = async(req, res, next) => {
    try {
        // hash the new password sent by the user
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const query = {
            _id: new ObjectId(req.params.id)
        };
        const data= {
            $set:{
                ...req.body, 
                updateAt: new Date().toISOString()
            }
        };
        const options = {returnDocument: 'after'}
        const updatedUser =  await userCollection.findOneAndUpdate(query, data, options);
        const {password: pass, updatedAt, createdAt, ...rest} = updatedUser;
        res.status(200).json(rest);
    } catch (error) {
        next({status: 500, error});
    }
};

// delete user
export const deleteUser = async (req, res, next) => {
    try {
        const query = {
            _id: new ObjectId(req.params.id)
        };
        await userCollection.deleteOne(query);
        res.status(200).json({message: 'User has been deleted'});
    } catch (error) {
        next({status: 500, error});
    }
};
