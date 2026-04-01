import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import authRoutes from '../routes/auth.js';
import adminRoutes from '../routes/admin.js';
import serviceRoutes from '../routes/services.js';
import bookingRoutes from '../routes/bookings.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Basic middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', status: 'ok' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'All in One Pros API', status: 'active' });
});

// For Vercel deployment
export default app;