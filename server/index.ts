import express from "express";
import { setupVite } from "./vite.js";
import { registerRoutes } from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  await setupVite(app);
} else {
  const publicPath = path.join(__dirname, "..", "dist", "public");
  app.use(express.static(publicPath));
}

// Register API routes
registerRoutes(app);

// Serve index.html for all non-API routes (client-side routing)
if (!isDevelopment) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "public", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});