import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';

// Load env
dotenv.config();

const app = express();

// Connect DB
connectDB();

// Trust proxy
app.set('trust proxy', 1);

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple request log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// ✅ ROOT
app.get('/', (req, res) => {
  res.json({
    message: '🚀 All in One Pros API Running',
    status: 'active'
  });
});


// ✅ HEALTH (FIXED: removed /api)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '✅ Backend is healthy',
    timestamp: new Date().toISOString()
  });
});


// ✅ ROUTES (FIXED: removed /api)
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/services', serviceRoutes);
app.use('/bookings', bookingRoutes);


// ✅ 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});


// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

export default app;