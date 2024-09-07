import express from 'express';
import {
  createInsurance,
  getUserInsurances,
  getInsuranceById,
  updateInsurance,
  deleteInsurance,
  calculateInsurancePrice,
} from '../controllers/insurance.controller.js';
import { verifyToken } from '../libs/middleware.js';

const router = express.Router();

// Define routes for insurances
router.post('/', createInsurance);
router.get('/', getUserInsurances);
router.get('/:id', verifyToken, getInsuranceById);
router.patch('/:id', verifyToken, updateInsurance);
router.delete('/:id', verifyToken, deleteInsurance);
router.post('/price', verifyToken, calculateInsurancePrice);

export default router;
