import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkPortAndStart() {
  try {
    console.log('🔍 Checking if port 5000 is available...');
    
    // Check if port 5000 is in use
    try {
      const { stdout } = await execAsync('netstat -ano | findstr :5000 | findstr LISTENING');
      if (stdout.trim()) {
        console.log('⚠️  Port 5000 is already in use!');
        console.log('✅ Your backend server is already running on http://localhost:5000');
        console.log('📱 Your frontend should be running on http://localhost:5173');
        console.log('🎯 You can access your website now!');
        return;
      }
    } catch (error) {
      // Port is free, continue to start server
    }
    
    console.log('✅ Port 5000 is available. Starting server...');
    
    // Import and start the server
    await import('./server.js');
    
  } catch (error) {
    console.error('❌ Error starting server:', error.message);
    
    if (error.message.includes('EADDRINUSE')) {
      console.log('\n🔧 Quick Fix:');
      console.log('1. Your server is already running!');
      console.log('2. Check http://localhost:5000 in your browser');
      console.log('3. If you need to restart, close all terminals first');
    }
  }
}

checkPortAndStart();