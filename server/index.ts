import express from "express";
import { setupVite } from "./vite.js";
import { registerRoutes } from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";
import { config, isDevelopment, validateConfig, logConfig } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log configuration on startup
logConfig();

// Validate required environment variables
validateConfig();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes BEFORE Vite middleware
registerRoutes(app);

if (isDevelopment()) {
  await setupVite(app);
} else {
  const publicPath = path.join(__dirname, "..", "dist", "public");
  app.use(express.static(publicPath));
}

// Serve index.html for all non-API routes (client-side routing)
if (!isDevelopment()) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
  });
}

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});