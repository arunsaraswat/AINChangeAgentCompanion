import type { Express } from "express";

export function registerRoutes(app: Express) {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Progress endpoints (for future use)
  app.get("/api/progress", (req, res) => {
    // Placeholder for progress retrieval
    res.json({ message: "Progress endpoint - to be implemented" });
  });

  app.post("/api/progress", (req, res) => {
    // Placeholder for progress saving
    res.json({ message: "Progress save endpoint - to be implemented" });
  });

  // Export endpoint (for future use)
  app.get("/api/export", (req, res) => {
    // Placeholder for data export
    res.json({ message: "Export endpoint - to be implemented" });
  });
}