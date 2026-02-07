/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Decision types for the Decisions app
 */

export interface DecisionOption {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
}

export interface Decision {
  id: string;
  userId: string;
  title: string;
  context?: string;
  confidence: number; // 1-5
  options: DecisionOption[];
  chosenOptionId?: string;
  outcome?: "good" | "neutral" | "bad";
  reflection?: string;
  createdAt: string;
  lockedAt?: string;
  completedAt?: string;
}

/**
 * API Response types
 */

export interface CreateDecisionRequest {
  title: string;
  context?: string;
  confidence: number;
  options: DecisionOption[];
}

export interface CreateDecisionResponse {
  decision: Decision;
}

export interface GetDecisionsResponse {
  decisions: Decision[];
}

export interface LockDecisionRequest {
  decisionId: string;
  chosenOptionId: string;
}

export interface LockDecisionResponse {
  decision: Decision;
}

export interface CompleteDecisionRequest {
  decisionId: string;
  outcome: "good" | "neutral" | "bad";
  reflection?: string;
}

export interface CompleteDecisionResponse {
  decision: Decision;
}

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}
