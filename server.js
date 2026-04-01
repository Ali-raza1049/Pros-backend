import app from './app.js';

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start server with enhanced error handling
const startServer = () => {
  try {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('🚀 ================================');
      console.log(`🚀 All in One Pros Backend Started`);
      console.log('🚀 ================================');
      console.log(`📡 Server running on port ${PORT}`);
      console.log(`🌐 Local: http://localhost:${PORT}`);
      console.log(`💚 Health: http://localhost:${PORT}/api/health`);
      console.log(`📱 Frontend: http://localhost:5173`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('🚀 ================================');
    });

    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log('❌ ================================');
        console.log(`❌ Port ${PORT} is already in use!`);
        console.log('❌ ================================');
        console.log(`✅ Your server might already be running`);
        console.log(`🌐 Check: http://localhost:${PORT}/api/health`);
        console.log('🔧 Solutions:');
        console.log('   1. Check if server is already running');
        console.log('   2. Close other terminals running the server');
        console.log('   3. Use different port: PORT=5001 npm start');
        console.log('   4. Kill existing process: npm run stop-server');
        console.log('❌ ================================');
        process.exit(1);
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });

    // Store server reference for graceful shutdown
    global.server = server;
    
    return server;
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();