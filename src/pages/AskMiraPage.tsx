import { useState } from "react";
import { Brain, Send, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const suggestedQueries = [
  "Find healthcare stocks up >10% this week",
  "Analyze TSLA's technical setup",
  "What's driving the crypto rally?",
  "Compare AAPL vs MSFT fundamentals",
];

const AskMiraPage = () => {
  const [deepAnalysis, setDeepAnalysis] = useState(false);
  const [answerType, setAnswerType] = useState<"Balanced" | "Concise" | "Comprehensive">("Balanced");
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="px-4 py-6 flex flex-col items-center min-h-[calc(100vh-8rem)]">
      {/* Brain Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative mb-6 mt-8"
      >
        <div className="w-20 h-20 rounded-full gradient-holographic flex items-center justify-center glow-holographic animate-float">
          <Brain className="w-10 h-10 text-primary-foreground" />
        </div>
        <div className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-accent" />
        </div>
      </motion.div>

      {/* Slogan */}
      <h2 className="text-2xl font-bold mb-1 text-center">"What's the trade?"</h2>
      <p className="text-sm text-muted-foreground text-center max-w-xs mb-8">
        Ask <span className="gradient-holographic-text font-semibold">MIRA</span> — Your AI trading assistant, more than a chatbot.
      </p>

      {/* Settings */}
      <div className="w-full max-w-sm space-y-3 mb-8">
        {/* Deep Analysis Toggle */}
        <div className="flex items-center justify-between bg-card rounded-xl px-4 py-3 border border-border/50">
          <div>
            <div className="text-sm font-medium">Deep Analysis</div>
            <div className="text-xs text-muted-foreground">More thorough, takes longer</div>
          </div>
          <button
            onClick={() => setDeepAnalysis(!deepAnalysis)}
            className={`w-11 h-6 rounded-full transition-colors relative ${deepAnalysis ? "gradient-holographic" : "bg-secondary"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-foreground absolute top-0.5 transition-transform ${deepAnalysis ? "translate-x-5.5 left-[1px]" : "left-[2px]"}`}
              style={{ transform: deepAnalysis ? "translateX(21px)" : "translateX(0)" }}
            />
          </button>
        </div>

        {/* Answer Type */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between bg-card rounded-xl px-4 py-3 border border-border/50"
          >
            <div>
              <div className="text-sm font-medium">Answer Type</div>
              <div className="text-xs text-muted-foreground">{answerType}</div>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showDropdown ? "rotate-180" : ""}`} />
          </button>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl overflow-hidden z-10"
            >
              {(["Balanced", "Concise", "Comprehensive"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => { setAnswerType(type); setShowDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-secondary transition-colors ${answerType === type ? "text-primary font-medium" : ""}`}
                >
                  {type}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Suggested Queries */}
      <div className="w-full max-w-sm mb-6">
        <div className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wider">Try asking</div>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-xs bg-secondary hover:bg-secondary/80 rounded-lg px-3 py-1.5 transition-colors text-secondary-foreground"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="w-full max-w-sm mt-auto">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Mira anything..."
            className="w-full bg-card border border-border/50 rounded-xl pl-4 pr-12 py-3.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg gradient-holographic flex items-center justify-center">
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskMiraPage;
