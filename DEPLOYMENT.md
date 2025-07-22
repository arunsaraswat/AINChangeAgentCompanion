# Deployment Guide

This guide covers deploying the AI-Native Change Agent Companion to different environments using Replit.

## Environment Strategy

The application supports three environments:
- **Development**: Local development using `.env` files
- **Staging**: Replit deployment with staging configuration
- **Production**: Replit deployment with production configuration

## Quick Start - Replit Deployment

1. **Fork/Import from GitHub**
   - Go to [Replit](https://replit.com)
   - Click "Create Repl" → "Import from GitHub"
   - Enter your repository URL
   - Replit will automatically detect it as a Node.js project

2. **Configure Secrets**
   - Click on "Secrets" tab in Replit
   - Add the following secrets:
     ```
     ENVIRONMENT=staging    # or 'production'
     PORT=5001             # optional, defaults to 5001
     NODE_ENV=production   # always 'production' in Replit
     ```
   - Add any API keys if needed:
     ```
     OPENROUTER_KEY=your_key_here
     OPENAI_API_KEY=your_key_here
     ```

3. **Deploy**
   - Click "Run" button
   - Replit will automatically:
     - Install dependencies
     - Build the application (ignoring TypeScript errors)
     - Start the server
   - Your app will be available at `https://your-repl-name.your-username.repl.co`

## Environment Configuration

### Development (Local)
```bash
# Uses .env file
npm run dev
```

### Staging/Production (Replit)
- Environment variables are loaded from Replit Secrets
- No `.env` file needed
- TypeScript errors are ignored during build

## How It Works

1. **Environment Detection**
   - The app checks for Replit environment variables (`REPL_ID`, `REPLIT_DB_URL`)
   - If found, it uses Replit Secrets
   - If not found, it loads from `.env` file

2. **Build Process**
   - `npm run build:prod` - Builds without failing on TypeScript errors
   - Client built with Vite
   - Server bundled with ESBuild

3. **Runtime Configuration**
   - `server/config.ts` handles all environment logic
   - Automatically switches between `.env` and Secrets
   - Validates required variables

## Troubleshooting

### TypeScript Errors
The production build ignores TypeScript errors. To check types locally:
```bash
npm run check
```

### Missing Environment Variables
Check the console output. The app logs which environment it's using and which variables are set/missing.

### Port Issues
Replit automatically assigns ports. The app will use the PORT environment variable if set, otherwise defaults to 5001.

### Build Failures
1. Check the Replit console for error messages
2. Ensure all dependencies are in `package.json`
3. Try running locally first with `npm run build`

## Security Best Practices

1. **Never commit secrets to Git**
   - Use `.env` for local development only
   - Always use Replit Secrets for deployed environments

2. **Environment Isolation**
   - Use different API keys for staging vs production
   - Set `ENVIRONMENT` variable appropriately

3. **Validate Configuration**
   - The app validates required variables on startup
   - Check logs to ensure all variables are loaded

## Monitoring

The application logs its configuration on startup:
```
Configuration loaded:
- Environment: staging
- Port: 5001
- Node Env: production
- OpenRouter Key: [SET]
- OpenAI Key: [NOT SET]
```

## Updates and Deployment Flow

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. In Replit, pull latest changes or re-import
5. Click "Run" to rebuild and deploy

## Advanced Configuration

### Custom Domain
1. Go to Replit project settings
2. Add custom domain
3. Update DNS records as instructed

### Performance Tuning
- Replit automatically scales based on usage
- For production, consider upgrading to a paid Replit plan

### Monitoring and Logs
- View logs in Replit console
- Consider adding error tracking service (Sentry, etc.)

## Support

For issues specific to:
- **Application bugs**: Check GitHub issues
- **Replit platform**: Visit Replit documentation
- **Environment setup**: Review `server/config.ts`