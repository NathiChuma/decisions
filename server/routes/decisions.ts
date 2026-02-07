import { RequestHandler } from "express";
import {
  Decision,
  CreateDecisionRequest,
  CreateDecisionResponse,
  GetDecisionsResponse,
  LockDecisionResponse,
  CompleteDecisionResponse,
} from "@shared/api";

// In-memory storage for demo purposes
// In production, this would be a database
const decisionsStore: Map<string, Decision[]> = new Map();

/**
 * Create a new decision
 */
export const handleCreateDecision: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const { title, context, confidence, options } = req.body as CreateDecisionRequest;

    if (!title || confidence < 1 || confidence > 5 || !options?.length) {
      res.status(400).json({
        error: "Invalid decision data",
      });
      return;
    }

    const decision: Decision = {
      id: `decision-${Date.now()}`,
      userId,
      title,
      context,
      confidence,
      options,
      createdAt: new Date().toISOString(),
    };

    const userDecisions = decisionsStore.get(userId) || [];
    userDecisions.push(decision);
    decisionsStore.set(userId, userDecisions);

    res.status(201).json({ decision } as CreateDecisionResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to create decision" });
  }
};

/**
 * Get all decisions for a user
 */
export const handleGetDecisions: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const decisions = decisionsStore.get(userId) || [];

    res.json({ decisions } as GetDecisionsResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch decisions" });
  }
};

/**
 * Get a specific decision
 */
export const handleGetDecision: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const { id } = req.params;

    const userDecisions = decisionsStore.get(userId) || [];
    const decision = userDecisions.find((d) => d.id === id);

    if (!decision) {
      res.status(404).json({ error: "Decision not found" });
      return;
    }

    res.json({ decision });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch decision" });
  }
};

/**
 * Lock a decision (choose an option)
 */
export const handleLockDecision: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const { id } = req.params;
    const { chosenOptionId } = req.body;

    if (!chosenOptionId) {
      res.status(400).json({ error: "chosenOptionId is required" });
      return;
    }

    const userDecisions = decisionsStore.get(userId) || [];
    const decision = userDecisions.find((d) => d.id === id);

    if (!decision) {
      res.status(404).json({ error: "Decision not found" });
      return;
    }

    if (decision.lockedAt) {
      res.status(400).json({ error: "Decision is already locked" });
      return;
    }

    // Verify the option exists
    if (!decision.options.find((o) => o.id === chosenOptionId)) {
      res.status(400).json({ error: "Option not found" });
      return;
    }

    decision.chosenOptionId = chosenOptionId;
    decision.lockedAt = new Date().toISOString();

    res.json({ decision } as LockDecisionResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to lock decision" });
  }
};

/**
 * Complete a decision with an outcome
 */
export const handleCompleteDecision: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const { id } = req.params;
    const { outcome, reflection } = req.body;

    if (!["good", "neutral", "bad"].includes(outcome)) {
      res.status(400).json({ error: "Invalid outcome" });
      return;
    }

    const userDecisions = decisionsStore.get(userId) || [];
    const decision = userDecisions.find((d) => d.id === id);

    if (!decision) {
      res.status(404).json({ error: "Decision not found" });
      return;
    }

    if (!decision.lockedAt) {
      res.status(400).json({ error: "Decision must be locked first" });
      return;
    }

    decision.outcome = outcome as "good" | "neutral" | "bad";
    decision.reflection = reflection;
    decision.completedAt = new Date().toISOString();

    res.json({ decision } as CompleteDecisionResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to complete decision" });
  }
};

/**
 * Update a decision (before it's locked)
 */
export const handleUpdateDecision: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const { id } = req.params;
    const { title, context, confidence, options } = req.body;

    const userDecisions = decisionsStore.get(userId) || [];
    const decision = userDecisions.find((d) => d.id === id);

    if (!decision) {
      res.status(404).json({ error: "Decision not found" });
      return;
    }

    if (decision.lockedAt) {
      res.status(400).json({ error: "Cannot edit a locked decision" });
      return;
    }

    if (title) decision.title = title;
    if (context !== undefined) decision.context = context;
    if (confidence) decision.confidence = confidence;
    if (options) decision.options = options;

    res.json({ decision });
  } catch (error) {
    res.status(500).json({ error: "Failed to update decision" });
  }
};

/**
 * Delete a decision (only if not locked)
 */
export const handleDeleteDecision: RequestHandler = (req, res) => {
  try {
    const userId = req.headers["user-id"] as string || "demo-user";
    const { id } = req.params;

    const userDecisions = decisionsStore.get(userId) || [];
    const decision = userDecisions.find((d) => d.id === id);

    if (!decision) {
      res.status(404).json({ error: "Decision not found" });
      return;
    }

    if (decision.lockedAt) {
      res.status(400).json({ error: "Cannot delete a locked decision" });
      return;
    }

    const filtered = userDecisions.filter((d) => d.id !== id);
    decisionsStore.set(userId, filtered);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete decision" });
  }
};
