import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowLeft, Plus, Trash2 } from "lucide-react";

interface Option {
  id: string;
  name: string;
  pros: string[];
  cons: string[];
}

const EMPTY_OPTION: Option = {
  id: "",
  name: "",
  pros: [""],
  cons: [""],
};

export default function NewDecision() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [options, setOptions] = useState<Option[]>([
    { ...EMPTY_OPTION, id: "1" },
    { ...EMPTY_OPTION, id: "2" },
  ]);
  const [currentStep, setCurrentStep] = useState<"details" | "options" | "review">(
    "details"
  );

  const addOption = () => {
    if (options.length < 4) {
      setOptions([
        ...options,
        { ...EMPTY_OPTION, id: Date.now().toString() },
      ]);
    }
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter((o) => o.id !== id));
    }
  };

  const updateOption = (id: string, field: string, value: any) => {
    setOptions(
      options.map((o) =>
        o.id === id ? { ...o, [field]: value } : o
      )
    );
  };

  const updatePro = (optionId: string, proIndex: number, value: string) => {
    setOptions(
      options.map((o) =>
        o.id === optionId
          ? {
              ...o,
              pros: o.pros.map((p, i) => (i === proIndex ? value : p)),
            }
          : o
      )
    );
  };

  const updateCon = (optionId: string, conIndex: number, value: string) => {
    setOptions(
      options.map((o) =>
        o.id === optionId
          ? {
              ...o,
              cons: o.cons.map((c, i) => (i === conIndex ? value : c)),
            }
          : o
      )
    );
  };

  const addPro = (optionId: string) => {
    setOptions(
      options.map((o) =>
        o.id === optionId ? { ...o, pros: [...o.pros, ""] } : o
      )
    );
  };

  const addCon = (optionId: string) => {
    setOptions(
      options.map((o) =>
        o.id === optionId ? { ...o, cons: [...o.cons, ""] } : o
      )
    );
  };

  const removePro = (optionId: string, proIndex: number) => {
    setOptions(
      options.map((o) =>
        o.id === optionId
          ? { ...o, pros: o.pros.filter((_, i) => i !== proIndex) }
          : o
      )
    );
  };

  const removeCon = (optionId: string, conIndex: number) => {
    setOptions(
      options.map((o) =>
        o.id === optionId
          ? { ...o, cons: o.cons.filter((_, i) => i !== conIndex) }
          : o
      )
    );
  };

  const canProceed = () => {
    if (currentStep === "details") {
      return title.trim().length > 0;
    }
    if (currentStep === "options") {
      return options.every(
        (o) => o.name.trim().length > 0 && o.pros.some((p) => p.trim()) && o.cons.some((c) => c.trim())
      );
    }
    return true;
  };

  const handleSaveDecision = () => {
    // TODO: Save decision to backend
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-border/40 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Decisions</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 flex-1 rounded-full ${
                currentStep === "details"
                  ? "bg-primary"
                  : "bg-primary/40"
              }`}
            ></div>
            <div
              className={`h-2 flex-1 rounded-full ${
                ["options", "review"].includes(currentStep)
                  ? "bg-primary"
                  : "bg-primary/40"
              }`}
            ></div>
            <div
              className={`h-2 flex-1 rounded-full ${
                currentStep === "review" ? "bg-primary" : "bg-primary/40"
              }`}
            ></div>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="text-xs font-medium text-muted-foreground">Details</span>
            <span className="text-xs font-medium text-muted-foreground">Options</span>
            <span className="text-xs font-medium text-muted-foreground">Review</span>
          </div>
        </div>

        {/* Step 1: Details */}
        {currentStep === "details" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                What's the decision?
              </h1>
              <p className="text-muted-foreground">
                Be specific. This helps you remember context later.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Decision Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Should I change jobs?"
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Context & Notes <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Add any context that matters. What's prompting this decision?"
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-32 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-4">
                How confident are you right now?
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Very unsure</div>
                  <div className="text-2xl font-bold text-primary">{confidence}/5</div>
                  <div className="text-sm text-muted-foreground">Very sure</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep("options")}
              disabled={!canProceed()}
              className="w-full mt-8 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Add Options
            </button>
          </div>
        )}

        {/* Step 2: Options */}
        {currentStep === "options" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                What are your options?
              </h1>
              <p className="text-muted-foreground">
                List your pros and cons for each option. This forces intentional thinking.
              </p>
            </div>

            <div className="space-y-6">
              {options.map((option, idx) => (
                <div
                  key={option.id}
                  className="border border-border/60 rounded-lg p-6 bg-secondary/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Option {idx + 1}
                    </h3>
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(option.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) => updateOption(option.id, "name", e.target.value)}
                      placeholder="Option name"
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />

                    {/* Pros */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Pros
                      </label>
                      <div className="space-y-2">
                        {option.pros.map((pro, proIdx) => (
                          <div key={proIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={pro}
                              onChange={(e) =>
                                updatePro(option.id, proIdx, e.target.value)
                              }
                              placeholder="Add a pro..."
                              className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                            />
                            {option.pros.length > 1 && (
                              <button
                                onClick={() => removePro(option.id, proIdx)}
                                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addPro(option.id)}
                        className="mt-2 text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add pro
                      </button>
                    </div>

                    {/* Cons */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Cons
                      </label>
                      <div className="space-y-2">
                        {option.cons.map((con, conIdx) => (
                          <div key={conIdx} className="flex gap-2">
                            <input
                              type="text"
                              value={con}
                              onChange={(e) =>
                                updateCon(option.id, conIdx, e.target.value)
                              }
                              placeholder="Add a con..."
                              className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm"
                            />
                            {option.cons.length > 1 && (
                              <button
                                onClick={() => removeCon(option.id, conIdx)}
                                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-muted-foreground"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => addCon(option.id)}
                        className="mt-2 text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add con
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {options.length < 4 && (
              <button
                onClick={addOption}
                className="w-full px-4 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Option
              </button>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setCurrentStep("details")}
                className="flex-1 px-4 py-3 border border-border/80 text-foreground rounded-lg font-semibold hover:bg-secondary/5 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep("review")}
                disabled={!canProceed()}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Review
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === "review" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Ready to lock in?
              </h1>
              <p className="text-muted-foreground">
                Review your decision. Once you lock it, you can't change it.
              </p>
            </div>

            <div className="bg-secondary/5 border border-border/60 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Decision</h3>
                <p className="text-lg font-semibold text-foreground mt-1">{title}</p>
              </div>

              {context && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Context</h3>
                  <p className="text-foreground mt-1 whitespace-pre-wrap">{context}</p>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Confidence Level
                </h3>
                <p className="text-lg font-semibold text-primary mt-1">
                  {confidence}/5
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Options
                </h3>
                <div className="space-y-3">
                  {options.map((option, idx) => (
                    <div
                      key={option.id}
                      className="border border-border/40 rounded p-3 bg-white"
                    >
                      <h4 className="font-semibold text-foreground mb-2">
                        {idx + 1}. {option.name}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-emerald-700 mb-1">Pros:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {option.pros
                              .filter((p) => p.trim())
                              .map((pro, idx) => (
                                <li key={idx}>{pro}</li>
                              ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 mb-1">Cons:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {option.cons
                              .filter((c) => c.trim())
                              .map((con, idx) => (
                                <li key={idx}>{con}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setCurrentStep("options")}
                className="flex-1 px-4 py-3 border border-border/80 text-foreground rounded-lg font-semibold hover:bg-secondary/5 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSaveDecision}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Save Decision
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
