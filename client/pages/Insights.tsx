import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, TrendingUp, BarChart3, Award } from "lucide-react";

interface Decision {
  id: string;
  confidence: number;
  outcome?: "good" | "neutral" | "bad";
}

const MOCK_DECISIONS: Decision[] = [
  { id: "1", confidence: 3, outcome: "good" },
  { id: "2", confidence: 4, outcome: "neutral" },
  { id: "3", confidence: 2, outcome: "good" },
  { id: "4", confidence: 5, outcome: "good" },
  { id: "5", confidence: 1, outcome: "good" },
  { id: "6", confidence: 3, outcome: "neutral" },
  { id: "7", confidence: 4, outcome: "bad" },
  { id: "8", confidence: 2, outcome: "bad" },
];

export default function Insights() {
  const decisions = MOCK_DECISIONS.filter((d) => d.outcome);

  const totalDecisions = decisions.length;
  const goodOutcomes = decisions.filter((d) => d.outcome === "good").length;
  const neutralOutcomes = decisions.filter((d) => d.outcome === "neutral").length;
  const badOutcomes = decisions.filter((d) => d.outcome === "bad").length;

  const goodRate = Math.round((goodOutcomes / totalDecisions) * 100);
  const avgConfidence = Math.round(
    decisions.reduce((sum, d) => sum + d.confidence, 0) / totalDecisions
  );

  // Low confidence but good outcome - humbling insights
  const lowConfidenceGoodOutcomes = decisions.filter(
    (d) => d.confidence <= 2 && d.outcome === "good"
  ).length;

  // High confidence but bad outcome
  const highConfidenceBadOutcomes = decisions.filter(
    (d) => d.confidence >= 4 && d.outcome === "bad"
  ).length;

  // Confidence by outcome breakdown
  const confidenceByOutcome = {
    good: decisions
      .filter((d) => d.outcome === "good")
      .reduce((sum, d) => sum + d.confidence, 0) / goodOutcomes || 0,
    neutral: decisions
      .filter((d) => d.outcome === "neutral")
      .reduce((sum, d) => sum + d.confidence, 0) / neutralOutcomes || 0,
    bad: decisions
      .filter((d) => d.outcome === "bad")
      .reduce((sum, d) => sum + d.confidence, 0) / badOutcomes || 0,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Dashboard</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Decisions</span>
          </Link>
          <div className="w-40"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Patterns</h1>
          <p className="text-muted-foreground">
            See how your judgment has been. No AI. Just math.
          </p>
        </div>

        {/* Main Stats */}
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
              <p className="text-sm text-emerald-700">({goodOutcomes}/{totalDecisions})</p>
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

          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg p-6 border border-amber-200/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-amber-900">
                Humbling Wins
              </span>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-amber-900">
              {lowConfidenceGoodOutcomes}
            </p>
            <p className="text-xs text-amber-700 mt-1">
              Low confidence, good outcome
            </p>
          </div>
        </div>

        {/* Outcome Distribution */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-border/60 rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Outcome Distribution
            </h2>
            <div className="space-y-4">
              {/* Good */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">Good</span>
                  <span className="text-sm font-bold text-emerald-900">
                    {goodOutcomes} ({Math.round((goodOutcomes / totalDecisions) * 100)}%)
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${(goodOutcomes / totalDecisions) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Neutral */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-700">Neutral</span>
                  <span className="text-sm font-bold text-amber-900">
                    {neutralOutcomes} ({Math.round((neutralOutcomes / totalDecisions) * 100)}%)
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: `${(neutralOutcomes / totalDecisions) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Bad */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700">Bad</span>
                  <span className="text-sm font-bold text-red-900">
                    {badOutcomes} ({Math.round((badOutcomes / totalDecisions) * 100)}%)
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${(badOutcomes / totalDecisions) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence by Outcome */}
          <div className="border border-border/60 rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-6">
              Avg Confidence by Outcome
            </h2>
            <div className="space-y-4">
              {/* Good */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-700">Good</span>
                  <span className="text-sm font-bold text-emerald-900">
                    {Math.round(confidenceByOutcome.good * 10) / 10}/5
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${(confidenceByOutcome.good / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Neutral */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-amber-700">Neutral</span>
                  <span className="text-sm font-bold text-amber-900">
                    {Math.round(confidenceByOutcome.neutral * 10) / 10}/5
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{
                      width: `${(confidenceByOutcome.neutral / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Bad */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700">Bad</span>
                  <span className="text-sm font-bold text-red-900">
                    {Math.round(confidenceByOutcome.bad * 10) / 10}/5
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${(confidenceByOutcome.bad / 5) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interesting Insights */}
        <div className="border border-border/60 rounded-lg p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">
            Interesting Patterns
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 border border-amber-200/40 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Humbling Wins</h3>
                  <p className="text-sm text-amber-800">
                    You made <strong>{lowConfidenceGoodOutcomes}</strong> decision
                    {lowConfidenceGoodOutcomes !== 1 ? "s" : ""} with low confidence that
                    turned out good. Sometimes luck beats preparation.
                  </p>
                </div>
              </div>
            </div>

            {highConfidenceBadOutcomes > 0 && (
              <div className="bg-red-50 border border-red-200/40 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-1">Reality Check</h3>
                    <p className="text-sm text-red-800">
                      You were highly confident on <strong>{highConfidenceBadOutcomes}</strong> decision
                      {highConfidenceBadOutcomes !== 1 ? "s" : ""} that went bad. Overconfidence is
                      worth watching.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
