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

  // AI chat endpoint for LLM chat helper
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { messages, model } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      if (!process.env.OPENROUTER_KEY) {
        console.error("OPENROUTER_KEY is not set in environment variables");
        return res.status(500).json({ error: "OpenRouter API key not configured" });
      }

      console.log("Making request to OpenRouter with model:", model || "openai/gpt-4o-mini");

      // Use OpenRouter for the chat
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5001",
          "X-Title": "AI-Native Change Agent Companion"
        },
        body: JSON.stringify({
          model: model || "openai/gpt-4o-mini",
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`OpenRouter API error: ${response.status}`, errorData);
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });
}