import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Decisionsss</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            I wasn't sure.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mt-2">
              I chose anyway.
            </span>
            <span className="block text-foreground mt-2">Here's what happened.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your uncertain choices. See how your judgment ages. No AI. No suggestions. Just honest decisions and real outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:gap-3"
            >
              Start Tracking <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 border border-border/80 text-foreground rounded-lg font-semibold hover:bg-secondary/5 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to track decisions and learn from outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-8 border border-blue-200/40 h-full">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Create a Decision
                </h3>
                <p className="text-muted-foreground">
                  Name your decision, add context, and rate your confidence level. Nothing fancy—just the facts.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-lg p-8 border border-cyan-200/40 h-full">
                <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Explore Options
                </h3>
                <p className="text-muted-foreground">
                  List up to 4 options with their pros and cons. Forces intentional thinking. Keeps things clear.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg p-8 border border-purple-200/40 h-full">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Lock Your Choice
                </h3>
                <p className="text-muted-foreground">
                  Choose an option and lock it in. Prevents second-guessing. Timestamp captures the moment.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="animate-slide-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg p-8 border border-emerald-200/40 h-full">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Record the Outcome
                </h3>
                <p className="text-muted-foreground">
                  Later, add the result and what you learned. Good, neutral, or bad—it all counts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See Your Pattern
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple insights. Real numbers. No fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white">
            <TrendingUp className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Total Decisions</h3>
            <p className="text-blue-100">
              How many choices have you made and tracked?
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-8 text-white">
            <CheckCircle2 className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Good Outcomes</h3>
            <p className="text-emerald-100">
              Your win rate. Where your judgment was sound.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 text-white">
            <ArrowRight className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-2">Confidence Pattern</h3>
            <p className="text-purple-100">
              How your confidence predicts outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 border-t border-blue-400/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to track your decisions?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start now. See how your judgment ages.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-blue-50 transition-all hover:gap-3"
          >
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>Decisions • Track uncertain choices. See how your judgment ages.</p>
        </div>
      </footer>
    </div>
  );
}
