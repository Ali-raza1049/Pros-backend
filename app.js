import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();

// Connect to DB (optimized for serverless)
let isConnected = false;

const connectDatabase = async () => {
if (isConnected) return;
await connectDB();
isConnected = true;
};

await connectDatabase();

// Middleware
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

// Root route
app.get('/', (req, res) => {
res.json({ message: 'All in One Pros API', status: 'active' });
});

export default app;
