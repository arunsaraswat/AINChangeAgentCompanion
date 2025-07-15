import { createServer } from "vite";
import type { Express } from "express";

export async function setupVite(app: Express) {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  app.use(vite.middlewares);
}