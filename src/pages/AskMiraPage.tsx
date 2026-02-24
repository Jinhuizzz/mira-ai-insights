import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, History, Plus, X, Check, Sparkles } from "lucide-react";
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

const benefits = [
  "Tailored AI persona",
  "Versatile for any scenario",
  "Living inside your messenger",
];

const AskMiraPage = ({ credits, onConsumeCredits, newsContext, onClearContext, onBack }: AskMiraPageProps) => {
  const [deepAnalysis, setDeepAnalysis] = useState(false);
  const [answerType, setAnswerType] = useState<"Balanced" | "Concise" | "Comprehensive">("Balanced");
  const [input, setInput] = useState("");
  const [showCreditAnim, setShowCreditAnim] = useState(false);
  const [creditCost, setCreditCost] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showClaimAgent, setShowClaimAgent] = useState(false);
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
      <div className="flex items-center justify-between px-4 pt-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <History className="w-4 h-4" />
            History
          </button>
        )}
        <div />
      </div>

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

          <div className="w-full max-w-sm mb-6 mt-16">
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

      {/* Claim Your Own Agent Banner */}
      {!hasMessages && (
        <div className="px-4 pb-2">
          <button
            onClick={() => setShowClaimAgent(true)}
            className="w-full flex items-center gap-3 bg-secondary/60 hover:bg-secondary border border-border/40 rounded-xl px-4 py-3 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full gradient-holographic flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">Claim your own agent</p>
              <p className="text-[11px] text-muted-foreground">Connect Mira to Telegram or Discord</p>
            </div>
            <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 pb-4 pt-2">
        <div className="relative flex items-center gap-2">
          <button
            className="w-10 h-10 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/50 flex items-center justify-center shrink-0 transition-colors text-muted-foreground hover:text-foreground"
            title="Add files/photos"
          >
            <Plus className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
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
            <span className="text-[10px] opacity-60">{deepAnalysis ? "On" : "Off"}</span>
          </button>

          <button
            onClick={() => setAnswerType(answerTypes[(currentIdx + 1) % 3])}
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border border-border/50 bg-secondary/50 text-muted-foreground transition-all hover:text-foreground"
          >
            {answerType}
          </button>
        </div>
      </div>

      {/* Claim Agent Overlay */}
      <AnimatePresence>
        {showClaimAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <button onClick={() => setShowClaimAgent(false)} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-semibold">Claim Your Agent</h2>
              <div className="w-9" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <p className="text-lg font-bold text-center mb-2">
                Connect <span className="gradient-holographic-text">Mira</span> to your platforms
              </p>
              <p className="text-sm text-muted-foreground text-center mb-10 max-w-xs">
                Bring your AI assistant wherever you communicate.
              </p>

              {/* Platform logos */}
              <div className="flex items-center gap-8 mb-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-[hsl(200_80%_55%)] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.97 1.25-5.55 3.67-.53.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.41-1.41-.87.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.59 4.6-1.87 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Telegram</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl bg-[hsl(235_86%_65%)] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Discord</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="w-full max-w-xs space-y-3 mb-10">
                {benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm text-foreground">{b}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="w-full max-w-xs space-y-3">
                <button className="w-full py-3 rounded-xl bg-[hsl(200_80%_55%)] hover:bg-[hsl(200_80%_50%)] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.97 1.25-5.55 3.67-.53.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.41-1.41-.87.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.59 4.6-1.87 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" fill="currentColor"/>
                  </svg>
                  Get started in Telegram
                </button>
                <button className="w-full py-3 rounded-xl bg-[hsl(235_86%_65%)] hover:bg-[hsl(235_86%_60%)] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" fill="currentColor"/>
                  </svg>
                  Get started in Discord
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskMiraPage;
