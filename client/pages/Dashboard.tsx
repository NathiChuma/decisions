import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Plus,
  TrendingUp,
  LogOut,
  BarChart3,
  PieChart,
} from "lucide-react";

interface Decision {
  id: string;
  title: string;
  confidence: number;
  createdAt: string;
  locked: boolean;
  outcome?: "good" | "neutral" | "bad";
}

const MOCK_DECISIONS: Decision[] = [
  {
    id: "1",
    title: "Should I change jobs?",
    confidence: 3,
    createdAt: "2024-01-15",
    locked: true,
    outcome: "good",
  },
  {
    id: "2",
    title: "Should I take this project?",
    confidence: 4,
    createdAt: "2024-01-20",
    locked: true,
    outcome: "neutral",
  },
  {
    id: "3",
    title: "Should I invest in this opportunity?",
    confidence: 2,
    createdAt: "2024-02-01",
    locked: true,
    outcome: "good",
  },
  {
    id: "4",
    title: "Should I move to a new city?",
    confidence: 3,
    createdAt: "2024-02-05",
    locked: false,
  },
];

export default function Dashboard() {
  const [decisions, setDecisions] = useState<Decision[]>(MOCK_DECISIONS);

  const totalDecisions = decisions.length;
  const lockedDecisions = decisions.filter((d) => d.locked).length;
  const goodOutcomes = decisions.filter((d) => d.outcome === "good").length;
  const goodRate =
    lockedDecisions > 0 ? Math.round((goodOutcomes / lockedDecisions) * 100) : 0;
  const avgConfidence =
    decisions.length > 0
      ? Math.round(
          decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length
        )
      : 0;

  const getOutcomeColor = (outcome?: string) => {
    switch (outcome) {
      case "good":
        return "bg-emerald-50 border-emerald-200/40 text-emerald-900";
      case "neutral":
        return "bg-amber-50 border-amber-200/40 text-amber-900";
      case "bad":
        return "bg-red-50 border-red-200/40 text-red-900";
      default:
        return "bg-blue-50 border-blue-200/40 text-blue-900";
    }
  };

  const getOutcomeBadgeColor = (outcome?: string) => {
    switch (outcome) {
      case "good":
        return "bg-emerald-100 text-emerald-700";
      case "neutral":
        return "bg-amber-100 text-amber-700";
      case "bad":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Decisions</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/insights"
              className="p-2 hover:bg-secondary/30 rounded-lg transition-colors"
              title="View insights"
            >
              <PieChart className="w-5 h-5 text-muted-foreground" />
            </Link>
            <button className="p-2 hover:bg-secondary/30 rounded-lg transition-colors" title="Sign out">
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Decisions
          </h1>
          <p className="text-muted-foreground">
            Track your uncertain choices and see how your judgment ages.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-6 border border-blue-200/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-blue-900">
                Total Decisions
              </span>
              <CheckCircle2 className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-blue-900">{totalDecisions}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg p-6 border border-emerald-200/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-emerald-900">
                Good Outcomes
              </span>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-emerald-900">{goodRate}%</p>
              <p className="text-sm text-emerald-700">
                ({goodOutcomes}/{lockedDecisions})
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg p-6 border border-purple-200/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-purple-900">
                Avg Confidence
              </span>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-purple-900">{avgConfidence}/5</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-lg p-6 border border-cyan-200/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-cyan-900">
                Locked & Waiting
              </span>
              <CheckCircle2 className="w-5 h-5 text-cyan-500" />
            </div>
            <p className="text-3xl font-bold text-cyan-900">
              {decisions.filter((d) => d.locked && !d.outcome).length}
            </p>
          </div>
        </div>

        {/* Create Decision Button */}
        <div className="mb-8">
          <Link
            to="/dashboard/new-decision"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:gap-3"
          >
            <Plus className="w-5 h-5" />
            New Decision
          </Link>
        </div>

        {/* Decisions List */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">
            All Decisions
          </h2>
          <div className="space-y-3">
            {decisions.map((decision) => (
              <div
                key={decision.id}
                className={`border rounded-lg p-5 ${getOutcomeColor(
                  decision.outcome
                )}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {decision.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="opacity-75">
                        {new Date(decision.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="opacity-75">
                        Confidence: {decision.confidence}/5
                      </span>
                      {decision.locked && (
                        <>
                          <span>•</span>
                          <span className="font-medium">Locked</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {decision.outcome && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getOutcomeBadgeColor(
                          decision.outcome
                        )}`}
                      >
                        {decision.outcome.charAt(0).toUpperCase() +
                          decision.outcome.slice(1)}
                      </span>
                    )}
                    <button className="px-3 py-2 text-sm font-medium opacity-75 hover:opacity-100 transition-opacity">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
