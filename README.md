# 🚀 All in One Pros - Backend API

A simplified, deployment-ready Node.js backend for the All in One Pros service booking platform.

## ✨ Features

- 🔐 **JWT Authentication** - Secure admin login
- 📊 **Dashboard Analytics** - Revenue and booking statistics  
- 🔧 **Service Management** - CRUD operations for services
- 📅 **Booking System** - Complete booking management
- 📱 **WhatsApp Integration** - Automatic booking notifications
- 🌐 **Deployment Ready** - Optimized for Vercel, Railway, Render
- 🛡️ **Security** - CORS, validation, error handling
- 📈 **Monitoring** - Health checks and logging

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Easy start (with environment checks)
npm run easy-start

# Or standard start
npm start

# Development with auto-reload
npm run dev
```

### First Time Setup

```bash
# Create admin user
npm run create-admin

# Add sample data
npm run add-sample-data
```

## 🌐 API Endpoints

### Public Endpoints
- `GET /` - API information
- `GET /api/health` - Health check
- `GET /api/services` - List all services
- `POST /api/bookings` - Create new booking

### Admin Endpoints (Requires Authentication)
- `POST /api/auth/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard statistics
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/:id/status` - Update booking status

## 🔧 Environment Variables

Create `.env` file:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allinoneprospros

# Authentication  
JWT_SECRET=your-super-secret-jwt-key

# WhatsApp
WHATSAPP_BUSINESS_NUMBER=971566118908

# Environment
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Port (optional)
PORT=5000
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Railway
```bash
npm i -g @railway/cli
railway up
```

### Render
1. Connect GitHub repository
2. Build: `npm install`
3. Start: `npm start`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📁 Project Structure

```
├── api/                 # Vercel serverless functions
├── config/             # Database & WhatsApp config
├── controllers/        # Business logic
├── middleware/         # Authentication & validation
├── models/            # MongoDB schemas
├── routes/            # API route definitions
├── scripts/           # Utility scripts
├── app.js             # Express application
├── server.js          # Server startup
└── start.js           # Easy startup script
```

## 🧪 Testing

```bash
# Check if server is running
curl http://localhost:5000/api/health

# Test admin login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@allinoneprospros.com","password":"admin123"}'

# Get services
curl http://localhost:5000/api/services
```

## 📱 WhatsApp Integration

The backend automatically:
- ✅ Saves bookings to database
- ✅ Logs booking details for WhatsApp
- ✅ Provides formatted messages for customer communication
- ✅ Supports admin notifications

WhatsApp Number: **+971 56 611 8908**

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Error handling
- Security headers
- Request logging

## 🛠️ Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start with auto-reload
- `npm run easy-start` - Start with environment checks
- `npm run stop-server` - Stop all Node.js processes
- `npm run check-port` - Check if port 5000 is in use
- `npm run create-admin` - Create admin user
- `npm run add-sample-data` - Add sample services

## 📊 Health Check Response

```json
{
  "message": "✅ All in One Pros Backend is healthy!",
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "database": "Connected to MongoDB Atlas",
  "uptime": 3600,
  "endpoints": {
    "auth": "/api/auth",
    "admin": "/api/admin",
    "services": "/api/services", 
    "bookings": "/api/bookings"
  }
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run stop-server
npm start
```

### Database Connection Issues
- Check MongoDB Atlas IP whitelist
- Verify connection string in `.env`
- Ensure network connectivity

### CORS Errors
- Update `FRONTEND_URL` in environment variables
- Check allowed origins in `app.js`

## 📞 Support

- 📧 Backend Issues: Check server logs and health endpoint
- 🌐 API Testing: Use the health check endpoint
- 📱 WhatsApp: Verify number +971 56 611 8908

---

**Your backend is now simplified and deployment-ready! 🚀**

## 🎯 What's New

- ✅ **Simplified Structure** - Separated app logic from server startup
- ✅ **Better Error Handling** - Comprehensive error management
- ✅ **Deployment Optimized** - Ready for Vercel, Railway, Render
- ✅ **Enhanced Logging** - Better debugging and monitoring
- ✅ **Easy Startup** - Interactive startup script with checks
- ✅ **Security Hardened** - Production-ready security features
- ✅ **CORS Configured** - Proper cross-origin handling
- ✅ **Graceful Shutdown** - Clean server termination

## 🔑 Default Admin Credentials

- **Email**: `admin@allinoneprospros.com`
- **Password**: `admin123`

*Change these credentials after first login for security!*