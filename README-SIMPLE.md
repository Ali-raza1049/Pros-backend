# 🚀 All in One Pros - Simple Backend

Super simple Node.js backend with same functionality.

## Quick Start

```bash
# Install
npm install

# Start
npm start

# Development
npm run dev
```

## Setup

1. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

2. Create admin:
```bash
npm run create-admin
```

3. Add sample data:
```bash
npm run add-sample-data
```

## Deploy

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway up
```

## API Endpoints

- `GET /api/health` - Check server
- `POST /api/auth/login` - Admin login
- `GET /api/services` - Get services
- `POST /api/bookings` - Create booking
- `GET /api/admin/dashboard` - Dashboard stats

## Files

- `simple-server.js` - Main server (only 30 lines!)
- `api/index.js` - Vercel deployment
- `vercel.json` - Deployment config

That's it! Super simple backend ready to deploy.