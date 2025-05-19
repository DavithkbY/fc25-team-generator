// Build script for Netlify deployment
import { exec } from 'child_process';

console.log('Building client app for Netlify deployment...');

// Execute the vite build command
exec('npx vite build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error during build: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
  }
  
  console.log(stdout);
  console.log('Client build completed successfully!');
});