import { useState } from "react";
import { Brain, Send, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsContext {
  title: string;
  summary: string;
  ticker: string;
  question: string;
}

interface AskMiraPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
  newsContext?: NewsContext | null;
  onClearContext?: () => void;
}

const suggestedQueries = [
  "Find healthcare stocks up >10% this week",
  "Analyze TSLA's technical setup",
  "What's driving the crypto rally?",
  "Compare AAPL vs MSFT fundamentals",
];

const AskMiraPage = ({ credits, onConsumeCredits, newsContext, onClearContext }: AskMiraPageProps) => {
  const [deepAnalysis, setDeepAnalysis] = useState(false);
  const [answerType, setAnswerType] = useState<"Balanced" | "Concise" | "Comprehensive">("Balanced");
  const [input, setInput] = useState("");
  const [showCreditAnim, setShowCreditAnim] = useState(false);
  const [creditCost, setCreditCost] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    const cost = deepAnalysis ? 5 : 1;
    setCreditCost(cost);
    setShowCreditAnim(true);
    onConsumeCredits(cost);
    setTimeout(() => setShowCreditAnim(false), 1500);
    setInput("");
  };

  const answerTypes = ["Balanced", "Concise", "Comprehensive"] as const;
  const currentIdx = answerTypes.indexOf(answerType);

  return (
    <div className="px-4 py-6 flex flex-col items-center min-h-[calc(100vh-8rem)]">
      {/* News Context Banner */}
      {newsContext && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mb-4 bg-secondary border border-border/50 rounded-xl p-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">Context from Now</div>
              <p className="text-xs font-medium leading-tight line-clamp-2">{newsContext.title}</p>
              <p className="text-[11px] text-muted-foreground mt-1">"{newsContext.question}"</p>
            </div>
            <button onClick={onClearContext} className="text-muted-foreground hover:text-foreground p-1">
              <span className="text-xs">✕</span>
            </button>
          </div>
        </motion.div>
      )}
      {/* Data Brain Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative mb-6 mt-8"
      >
        <div className="w-24 h-24 rounded-full relative flex items-center justify-center animate-float">
          {/* Neural network glow effect */}
          <div className="absolute inset-0 rounded-full gradient-holographic opacity-30 blur-xl animate-pulse-glow" />
          <div className="absolute inset-1 rounded-full gradient-holographic opacity-60 blur-md" />
          <div className="relative w-20 h-20 rounded-full gradient-holographic flex items-center justify-center glow-holographic">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
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

      {/* Input Area */}
      <div className="w-full max-w-sm mt-auto relative">
        {/* Credit consumption animation */}
        <AnimatePresence>
          {showCreditAnim && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -30 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 text-accent font-mono text-sm font-bold flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5" />
              -{creditCost} Credit{creditCost > 1 ? "s" : ""}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask Mira anything..."
            className="w-full bg-card border border-border/50 rounded-xl pl-4 pr-12 py-3.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg gradient-holographic flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>

        {/* Capsule Toggles below input */}
        <div className="flex items-center gap-2 mt-2.5">
          {/* Deep Analysis Toggle */}
          <button
            onClick={() => setDeepAnalysis(!deepAnalysis)}
            className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${
              deepAnalysis
                ? "border-accent/50 bg-accent/10 text-accent"
                : "border-border/50 bg-secondary/50 text-muted-foreground"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${deepAnalysis ? "bg-accent shadow-[0_0_4px_hsl(260_70%_58%)]" : "bg-muted-foreground/50"}`} />
            Deep Analysis
            <span className="text-[10px] opacity-60">{deepAnalysis ? "5cr" : "Off"}</span>
          </button>

          {/* Answer Type Cycle */}
          <button
            onClick={() => setAnswerType(answerTypes[(currentIdx + 1) % 3])}
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-border/50 bg-secondary/50 text-muted-foreground transition-all hover:text-foreground"
          >
            {answerType}
          </button>

          <div className="ml-auto text-[10px] text-muted-foreground font-mono">
            Cost: <span className="text-accent font-semibold">{deepAnalysis ? 5 : 1}</span> cr
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskMiraPage;
