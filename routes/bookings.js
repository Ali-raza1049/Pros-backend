import express from 'express';
import { body } from 'express-validator';
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  updateBooking,
  deleteBooking,
  getBookingStats
} from '../controllers/bookingController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Valid email is required'),
  body('customerPhone').notEmpty().withMessage('Phone number is required'),
  body('serviceId').notEmpty().withMessage('Service ID is required'),
  body('bookingDate').isISO8601().withMessage('Valid booking date is required'),
  body('bookingTime').notEmpty().withMessage('Booking time is required'),
  body('address').notEmpty().withMessage('Address is required')
], createBooking);

// Protected routes (admin only)
router.get('/', verifyToken, getAllBookings);
router.get('/stats', verifyToken, getBookingStats);
router.get('/:id', verifyToken, getBookingById);

router.put('/:id/status', verifyToken, [
  body('status').isIn(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'])
    .withMessage('Invalid status')
], updateBookingStatus);

router.put('/:id', verifyToken, [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Valid email is required'),
  body('customerPhone').notEmpty().withMessage('Phone number is required'),
  body('bookingDate').isISO8601().withMessage('Valid booking date is required'),
  body('bookingTime').notEmpty().withMessage('Booking time is required'),
  body('address').notEmpty().withMessage('Address is required')
], updateBooking);

router.delete('/:id', verifyToken, deleteBooking);

export default router;