// Environment configuration handler
// In development: tsx --env-file loads .env automatically
// In production: uses Replit secrets or environment variables

// Environment detection
export const getEnvironment = () => {
  // Check if running on Replit
  if (process.env.REPL_ID || process.env.REPLIT_DB_URL) {
    // In Replit, use ENVIRONMENT variable to distinguish staging/prod
    return process.env.ENVIRONMENT || 'staging';
  }
  
  // Local development
  return process.env.NODE_ENV || 'development';
};

export const isDevelopment = () => getEnvironment() === 'development';
export const isStaging = () => getEnvironment() === 'staging';
export const isProduction = () => getEnvironment() === 'production';

// Configuration object
export const config = {
  port: process.env.PORT || '5001',
  nodeEnv: process.env.NODE_ENV || 'production',
  environment: getEnvironment(),
  
  // API Keys (optional - only if needed)
  openRouterKey: process.env.OPENROUTER_KEY,
  openAIKey: process.env.OPENAI_API_KEY,
  
  // Add more configuration as needed
};

// Validate required environment variables
export const validateConfig = () => {
  const required: string[] = [];
  const missing: string[] = [];
  
  // Add any required environment variables here
  // Example: required.push('OPENROUTER_KEY');
  
  for (const key of required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    console.error('Please set these in:');
    console.error('- .env file (development)');
    console.error('- Replit Secrets (staging/production)');
    
    if (!isDevelopment()) {
      // In production, exit if required vars are missing
      process.exit(1);
    }
  }
  
  return missing.length === 0;
};

// Log configuration (without sensitive data)
export const logConfig = () => {
  console.log('Configuration loaded:');
  console.log(`- Environment: ${config.environment}`);
  console.log(`- Port: ${config.port}`);
  console.log(`- Node Env: ${config.nodeEnv}`);
  console.log(`- OpenRouter Key: ${config.openRouterKey ? '[SET]' : '[NOT SET]'}`);
  console.log(`- OpenAI Key: ${config.openAIKey ? '[SET]' : '[NOT SET]'}`);
};