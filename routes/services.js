import express from 'express';
import { body } from 'express-validator';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus
} from '../controllers/serviceController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes (authentication required)
router.post('/', verifyToken, [
  body('name').notEmpty().withMessage('Service name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('duration').isNumeric().withMessage('Duration must be a number')
], createService);

router.put('/:id', verifyToken, [
  body('name').notEmpty().withMessage('Service name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('duration').isNumeric().withMessage('Duration must be a number')
], updateService);

router.delete('/:id', verifyToken, deleteService);
router.patch('/:id/toggle-status', verifyToken, toggleServiceStatus);

export default router;