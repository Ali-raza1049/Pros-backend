import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// Get admin dashboard data
router.get('/dashboard', verifyToken, getDashboardStats);

export default router;