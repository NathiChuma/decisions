import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleCreateDecision,
  handleGetDecisions,
  handleGetDecision,
  handleLockDecision,
  handleCompleteDecision,
  handleUpdateDecision,
  handleDeleteDecision,
} from "./routes/decisions";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Decisions API routes
  app.post("/api/decisions", handleCreateDecision);
  app.get("/api/decisions", handleGetDecisions);
  app.get("/api/decisions/:id", handleGetDecision);
  app.patch("/api/decisions/:id", handleUpdateDecision);
  app.post("/api/decisions/:id/lock", handleLockDecision);
  app.post("/api/decisions/:id/complete", handleCompleteDecision);
  app.delete("/api/decisions/:id", handleDeleteDecision);

  return app;
}
