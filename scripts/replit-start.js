#!/usr/bin/env node

import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Replit startup script starting...');

// Check if we're in Replit environment
const isReplit = process.env.REPL_ID || process.env.REPLIT_DB_URL;
if (isReplit) {
  console.log('✅ Running in Replit environment');
} else {
  console.log('ℹ️  Not running in Replit, but continuing anyway...');
}

// Check if dist directory exists
const distPath = join(rootDir, 'dist');
const distIndexPath = join(distPath, 'index.js');

if (!existsSync(distPath) || !existsSync(distIndexPath)) {
  console.log('📦 Distribution files not found. Building application...');
  
  try {
    // Install dependencies if node_modules doesn't exist
    // Note: We use --production=false to ensure devDependencies are installed
    // This is necessary because Vite and other build tools are devDependencies
    const nodeModulesPath = join(rootDir, 'node_modules');
    if (!existsSync(nodeModulesPath)) {
      console.log('📥 Installing dependencies (including devDependencies for build tools)...');
      execSync('npm install --production=false', { 
        stdio: 'inherit',
        cwd: rootDir 
      });
    }
    
    // Build the application
    console.log('🔨 Building application...');
    execSync('npm run build:prod', { 
      stdio: 'inherit',
      cwd: rootDir 
    });
    
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Check if the build was successful
if (!existsSync(distIndexPath)) {
  console.error('❌ Build output not found at', distIndexPath);
  console.error('Please check the build logs above for errors.');
  process.exit(1);
}

// Start the application
console.log('🚀 Starting application...');
try {
  // Import and run the server
  await import(distIndexPath);
} catch (error) {
  console.error('❌ Failed to start application:', error.message);
  process.exit(1);
}