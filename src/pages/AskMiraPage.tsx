import { useState, useEffect, useRef } from "react";
import { Brain, Send, Sparkles, Zap, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsContext {
  title: string;
  summary: string;
  ticker: string;
  question: string;
}

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface AskMiraPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
  newsContext?: NewsContext | null;
  onClearContext?: () => void;
  onBack?: () => void;
}

const suggestedQueries = [
  "Find healthcare stocks up >10% this week",
  "Analyze TSLA's technical setup",
  "What's driving the crypto rally?",
  "Compare AAPL vs MSFT fundamentals",
];

const generateMockAnswer = (ctx: NewsContext): string => {
  return `## Analysis: ${ctx.ticker}\n\n**${ctx.title}**\n\n${ctx.summary}\n\n### Key Takeaways\n- This development could have significant implications for ${ctx.ticker} shareholders.\n- Market sentiment appears to be shifting based on this news.\n- Investors should monitor upcoming earnings calls and guidance for further clarity.\n\n### What to Watch\n1. **Short-term price action** — Watch for support/resistance levels around current trading range.\n2. **Volume patterns** — Unusual volume could confirm directional momentum.\n3. **Sector correlation** — Compare with peers to gauge relative strength.\n\n> 💡 *This is AI-generated analysis for informational purposes only. Not financial advice.*`;
};

const AskMiraPage = ({ credits, onConsumeCredits, newsContext, onClearContext, onBack }: AskMiraPageProps) => {
  const [deepAnalysis, setDeepAnalysis] = useState(false);
  const [answerType, setAnswerType] = useState<"Balanced" | "Concise" | "Comprehensive">("Balanced");
  const [input, setInput] = useState("");
  const [showCreditAnim, setShowCreditAnim] = useState(false);
  const [creditCost, setCreditCost] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const processedContextRef = useRef<string | null>(null);

  // Auto-process newsContext
  useEffect(() => {
    if (newsContext && newsContext.question && processedContextRef.current !== newsContext.question) {
      processedContextRef.current = newsContext.question;
      const userMsg: ChatMessage = {
        id: Date.now(),
        role: "user",
        content: `📰 **${newsContext.title}**\n\n${newsContext.question}`,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      const cost = deepAnalysis ? 5 : 1;
      setCreditCost(cost);
      setShowCreditAnim(true);
      onConsumeCredits(cost);
      setTimeout(() => setShowCreditAnim(false), 1500);

      setTimeout(() => {
        const answer = generateMockAnswer(newsContext);
        const assistantMsg: ChatMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: answer,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, 1500);
    }
  }, [newsContext]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);

    const cost = deepAnalysis ? 5 : 1;
    setCreditCost(cost);
    setShowCreditAnim(true);
    onConsumeCredits(cost);
    setTimeout(() => setShowCreditAnim(false), 1500);

    setIsTyping(true);
    const query = input;
    setInput("");

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `I've analyzed your question about "${query}". Here's what I found:\n\n- Market conditions suggest cautious optimism.\n- Key technical indicators are showing mixed signals.\n- Keep an eye on upcoming macro events for directional cues.\n\n> *This is a simulated response. Connect to an AI backend for real analysis.*`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const answerTypes = ["Balanced", "Concise", "Comprehensive"] as const;
  const currentIdx = answerTypes.indexOf(answerType);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {onBack && (
        <div className="px-4 pt-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      )}

      {!hasMessages ? (
        <div className="flex-1 flex flex-col items-center px-4 py-6">
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
                </div>
                <button onClick={onClearContext} className="text-muted-foreground hover:text-foreground p-1">
                  <span className="text-xs">✕</span>
                </button>
              </div>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold mb-1 text-center mt-12">Hi, I am <span className="gradient-holographic-text">MIRA</span></h2>
          <p className="text-sm text-muted-foreground text-center max-w-xs mb-8">
            Your AI trading assistant.
          </p>

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
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-secondary-foreground rounded-bl-md"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="space-y-2">
                    {msg.content.split("\n").map((line, i) => {
                      if (line.startsWith("## ")) return <h2 key={i} className="text-base font-bold mt-1">{line.replace("## ", "")}</h2>;
                      if (line.startsWith("### ")) return <h3 key={i} className="text-sm font-semibold mt-2">{line.replace("### ", "")}</h3>;
                      if (line.startsWith("- ")) return <p key={i} className="pl-3 text-xs">• {line.replace("- ", "")}</p>;
                      if (line.startsWith("> ")) return <p key={i} className="text-[11px] text-muted-foreground italic border-l-2 border-accent/40 pl-2 mt-2">{line.replace("> ", "")}</p>;
                      if (line.match(/^\d+\./)) return <p key={i} className="pl-3 text-xs">{line}</p>;
                      if (line.trim() === "") return <div key={i} className="h-1" />;
                      return <p key={i} className="text-xs">{line}</p>;
                    })}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className="text-xs">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 pb-4 pt-2 relative">
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

        <div className="flex items-center gap-2 mt-2.5">
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

          <button
            onClick={() => setAnswerType(answerTypes[(currentIdx + 1) % 3])}
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-border/50 bg-secondary/50 text-muted-foreground transition-all hover:text-foreground"
          >
            {answerType}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AskMiraPage;
