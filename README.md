# All in One Pros - Backend

Complete authentication system with MongoDB Atlas integration.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
1. Copy `.env.example` to `.env`
2. Update MongoDB Atlas connection string in `.env`
3. Update JWT_SECRET with a secure key

### 3. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string and update `MONGODB_URI` in `.env`
4. Make sure to replace `<username>`, `<password>`, and `<cluster-url>`

### 4. Create Admin User
```bash
npm run create-admin
```

### 5. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin (optional)
- `GET /api/auth/verify` - Verify JWT token

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/services` - Get all services
- `GET /api/admin/bookings` - Get all bookings

## Default Credentials
- Email: `owner@allinonepros.ae`
- Password: `admin123`

## Features
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Protected Routes
- ✅ MongoDB Integration
- ✅ Input Validation
- ✅ Error Handling
- ✅ CORS Configuration