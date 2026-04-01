#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

const log = (color, message) => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

async function checkEnvironment() {
  log('cyan', '🔍 Checking environment...');
  
  // Check if .env exists
  if (!fs.existsSync('.env')) {
    log('yellow', '⚠️  .env file not found');
    log('blue', '📝 Creating .env from .env.example...');
    
    if (fs.existsSync('.env.example')) {
      fs.copyFileSync('.env.example', '.env');
      log('green', '✅ .env file created');
      log('yellow', '⚠️  Please update .env with your actual values');
    } else {
      log('red', '❌ .env.example not found');
      return false;
    }
  }
  
  return true;
}

async function checkPort() {
  const PORT = process.env.PORT || 5000;
  
  try {
    log('cyan', `🔍 Checking if port ${PORT} is available...`);
    
    const { stdout } = await execAsync(`netstat -ano | findstr :${PORT} | findstr LISTENING`);
    
    if (stdout.trim()) {
      log('yellow', `⚠️  Port ${PORT} is already in use!`);
      log('green', `✅ Your server might already be running`);
      log('blue', `🌐 Check: http://localhost:${PORT}/api/health`);
      
      // Ask user what to do
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      return new Promise((resolve) => {
        rl.question('Continue anyway? (y/N): ', (answer) => {
          rl.close();
          resolve(answer.toLowerCase() === 'y');
        });
      });
    }
    
    log('green', `✅ Port ${PORT} is available`);
    return true;
    
  } catch (error) {
    // Port is free
    log('green', `✅ Port ${PORT} is available`);
    return true;
  }
}

async function startServer() {
  try {
    log('magenta', '🚀 ================================');
    log('magenta', '🚀 All in One Pros Backend Starter');
    log('magenta', '🚀 ================================');
    
    // Check environment
    const envOk = await checkEnvironment();
    if (!envOk) {
      log('red', '❌ Environment check failed');
      process.exit(1);
    }
    
    // Check port
    const portOk = await checkPort();
    if (!portOk) {
      log('yellow', '🛑 Startup cancelled by user');
      process.exit(0);
    }
    
    // Start server
    log('green', '🚀 Starting server...');
    
    // Import and start the server
    await import('./server.js');
    
  } catch (error) {
    log('red', '❌ Failed to start server:');
    console.error(error);
    
    if (error.message.includes('EADDRINUSE')) {
      log('yellow', '\n🔧 Quick fixes:');
      log('blue', '1. Check if server is already running');
      log('blue', '2. Close other terminals');
      log('blue', '3. Use: npm run stop-server');
      log('blue', '4. Try different port: PORT=5001 npm start');
    }
    
    process.exit(1);
  }
}

// Handle shutdown
process.on('SIGINT', () => {
  log('yellow', '\n🛑 Shutting down...');
  process.exit(0);
});

// Start the application
startServer();