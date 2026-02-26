import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, History, X, Check, Sparkles, Plus, FileText, ImageIcon, BrainCircuit, User, Target, Pencil, Trash2, MoreVertical } from "lucide-react";
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

interface ArchivedChat {
  id: number;
  topic: string;
  persona: string;
  focus: string;
  messages: ChatMessage[];
  date: string;
}

interface CreatedTeam {
  id: number;
  name: string;
  focus: string;
}

interface AskMiraPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
  newsContext?: NewsContext | null;
  onClearContext?: () => void;
  onBack?: () => void;
  onSubPageChange?: (isSubPage: boolean) => void;
  showHistory?: boolean;
  onCloseHistory?: () => void;
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
  "Customed MBTI",
  "Versatile for any scenario",
  "Living inside your messenger",
];

const AskMiraPage = ({ credits, onConsumeCredits, newsContext, onClearContext, onBack, onSubPageChange, showHistory, onCloseHistory }: AskMiraPageProps) => {
  const [deepAnalysis, setDeepAnalysis] = useState(false);
  const [input, setInput] = useState("");
  const [showCreditAnim, setShowCreditAnim] = useState(false);
  const [creditCost, setCreditCost] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showClaimAgent, setShowClaimAgent] = useState(false);
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [pendingInput, setPendingInput] = useState("");
  const [chatName, setChatName] = useState("");
  const [persona, setPersona] = useState("");
  const [focus, setFocus] = useState("");
  const [archivedChats, setArchivedChats] = useState<ArchivedChat[]>([
    { id: 1, topic: "TSLA Valuation Analysis", persona: "Value Investor", focus: "Downside risk", messages: [
      { id: 1, role: "user", content: "What's TSLA's fair value?" },
      { id: 2, role: "assistant", content: "Based on DCF analysis, TSLA's fair value range is $180-$220. Current price suggests a premium for growth expectations." },
    ], date: "Feb 24" },
    { id: 2, topic: "Crypto Rally Drivers", persona: "Macro Analyst", focus: "Market momentum", messages: [
      { id: 3, role: "user", content: "What's driving the crypto rally?" },
      { id: 4, role: "assistant", content: "Key drivers include ETF inflows, halving anticipation, and improving macro conditions with rate cut expectations." },
    ], date: "Feb 22" },
    { id: 3, topic: "AAPL vs MSFT Comparison", persona: "Growth Investor", focus: "Revenue growth", messages: [
      { id: 5, role: "user", content: "Compare AAPL vs MSFT fundamentals" },
      { id: 6, role: "assistant", content: "MSFT leads in revenue growth (18% vs 8%) driven by cloud. AAPL has stronger margins and buyback program." },
    ], date: "Feb 20" },
  ]);
  const [viewingArchivedChat, setViewingArchivedChat] = useState<ArchivedChat | null>(null);
  const [createdTeams, setCreatedTeams] = useState<CreatedTeam[]>([
    { id: 0, name: "Generalist", focus: "Ask anything" },
  ]);
  const [renamingTeamId, setRenamingTeamId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const processedContextRef = useRef<string | null>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  // Close plus menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (plusMenuRef.current && !plusMenuRef.current.contains(e.target as Node)) {
        setShowPlusMenu(false);
      }
    };
    if (showPlusMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showPlusMenu]);

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

  // Notify parent about sub-page state based on messages
  useEffect(() => {
    onSubPageChange?.(messages.length > 0);
  }, [messages.length, onSubPageChange]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
  };

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    const cost = deepAnalysis ? 5 : 1;
    setCreditCost(cost);
    setShowCreditAnim(true);
    onConsumeCredits(cost);
    setTimeout(() => setShowCreditAnim(false), 1500);

    setIsTyping(true);
    setInput("");

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: `I've analyzed your question about "${text}". Here's what I found:\n\n- Market conditions suggest cautious optimism.\n- Key technical indicators are showing mixed signals.\n- Keep an eye on upcoming macro events for directional cues.\n\n> *This is a simulated response. Connect to an AI backend for real analysis.*`,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleConfirmNewChat = () => {
    setShowNewChatModal(false);
    // Save created team
    const newTeam: CreatedTeam = { id: Date.now(), name: persona, focus };
    setCreatedTeams((prev) => [...prev, newTeam]);
    setChatName(persona);
    // Add Mira's opening message
    const miraGreeting: ChatMessage = {
      id: Date.now(),
      role: "assistant",
      content: "What can I do for you?",
    };
    setMessages([miraGreeting]);
    setPendingInput("");
  };

  const archiveAndReset = () => {
    if (messages.length > 0 && chatName.trim()) {
      setArchivedChats((prev) => [
        { id: Date.now(), topic: chatName, persona, focus, messages: [...messages], date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) },
        ...prev,
      ]);
    }
    setMessages([]);
    setChatName("");
    setPersona("");
    setFocus("");
    setViewingArchivedChat(null);
  };

  // Handle showHistory from parent
  useEffect(() => {
    if (showHistory) {
      onSubPageChange?.(true);
    }
  }, [showHistory]);

  const hasMessages = messages.length > 0;

  // History list screen
  if (showHistory && !viewingArchivedChat) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.2 }}
        className="px-4 py-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => { onCloseHistory?.(); onSubPageChange?.(false); }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold">Chat History</h2>
            <p className="text-xs text-muted-foreground">Your past conversations with Mira</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {archivedChats.map((chat, i) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => setViewingArchivedChat(chat)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{chat.topic}</span>
                  <span className="text-[10px] text-muted-foreground">{chat.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  {chat.persona && <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/15 text-accent">{chat.persona}</span>}
                  {chat.focus && <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{chat.focus}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 truncate">{chat.messages[chat.messages.length - 1]?.content}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setArchivedChats(prev => prev.filter(c => c.id !== chat.id)); }}
                className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {archivedChats.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No conversations yet</p>
          )}
        </div>
      </motion.div>
    );
  }

  // Viewing an archived conversation
  if (viewingArchivedChat) {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <button
            onClick={() => setViewingArchivedChat(null)}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">{viewingArchivedChat.topic}</h3>
            <div className="flex items-center gap-2">
              {viewingArchivedChat.persona && <span className="text-[9px] text-accent">{viewingArchivedChat.persona}</span>}
              {viewingArchivedChat.focus && <span className="text-[9px] text-muted-foreground">· {viewingArchivedChat.focus}</span>}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {viewingArchivedChat.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}>
                <div className="space-y-1">
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className="text-xs">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${hasMessages ? "h-[calc(100vh-3.5rem)]" : "h-[calc(100vh-8rem)]"}`}>
      {/* Chat header with team name */}
      {hasMessages && persona ? (
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <button
            onClick={archiveAndReset}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold truncate">{persona}</h3>
            {focus && <p className="text-[10px] text-muted-foreground">{focus}</p>}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-4 pt-4">
          {onBack ? (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : hasMessages ? (
            <button
              onClick={archiveAndReset}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div />
          )}
          <div />
        </div>
      )}

      {!hasMessages ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
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

          <button
            onClick={() => {
              setChatName("");
              setPersona("");
              setFocus("");
              setShowNewChatModal(true);
            }}
            className="w-14 h-14 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center transition-colors group mb-3"
          >
            <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-foreground">Build Your Agent Team</p>
            <p className="text-[11px] text-muted-foreground max-w-[200px] mx-auto leading-tight mt-1">AI persona that remembers, learns, and empowers your growth.</p>
          </div>

          <div className="w-full max-w-sm">
              <div className="grid grid-cols-3 gap-3">
                {/* Connect card */}
                <div className="relative">
                <button
                  onClick={() => setShowClaimAgent(true)}
                  className="aspect-square w-full flex flex-col items-center justify-center gap-2 bg-card border border-border/50 rounded-2xl p-3 hover:border-border transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 relative">
                    <span className="text-base font-bold gradient-holographic-text leading-none">W</span>
                    <div className="absolute -bottom-1 -right-1 flex -space-x-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-[hsl(200_80%_55%)] border border-background flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-2 h-2 text-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.97 1.25-5.55 3.67-.53.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.41-1.41-.87.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.59 4.6-1.87 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" fill="currentColor"/></svg>
                      </div>
                      <div className="w-3.5 h-3.5 rounded-full bg-[hsl(235_86%_65%)] border border-background flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" className="w-2 h-2 text-white"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" fill="currentColor"/></svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-center truncate w-full">Your own bot</p>
                  <p className="text-[10px] text-muted-foreground text-center truncate w-full">connect to your platforms</p>
                </button>
                </div>
                {createdTeams.map((team) => (
                  <div key={team.id} className="relative group">
                    {/* Action buttons top-right (hide delete for default Generalist) */}
                    <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenamingTeamId(team.id);
                          setRenameValue(team.name);
                        }}
                        className="w-5 h-5 rounded-md bg-secondary/80 flex items-center justify-center hover:bg-secondary"
                      >
                        <Pencil className="w-2.5 h-2.5 text-muted-foreground" />
                      </button>
                      {team.id !== 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCreatedTeams((prev) => prev.filter((t) => t.id !== team.id));
                          }}
                          className="w-5 h-5 rounded-md bg-secondary/80 flex items-center justify-center hover:bg-destructive/20"
                        >
                          <Trash2 className="w-2.5 h-2.5 text-muted-foreground" />
                        </button>
                      )}
                    </div>

                    {/* Rename modal */}
                    {renamingTeamId === team.id && (
                      <div className="absolute inset-0 z-20 bg-card border border-border rounded-2xl flex flex-col items-center justify-center gap-2 p-2">
                        <input
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          className="w-full text-xs text-center bg-secondary/50 rounded-lg px-2 py-1.5 outline-none border border-border/50 focus:border-primary/50"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={() => setRenamingTeamId(null)}
                            className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center"
                          >
                            <X className="w-3 h-3 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => {
                              if (renameValue.trim()) {
                                setCreatedTeams((prev) =>
                                  prev.map((t) => t.id === team.id ? { ...t, name: renameValue.trim() } : t)
                                );
                              }
                              setRenamingTeamId(null);
                            }}
                            className="w-6 h-6 rounded-md bg-primary flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </button>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setPersona(team.name);
                        setFocus(team.focus);
                        setChatName(team.name);
                        const miraGreeting: ChatMessage = {
                          id: Date.now(),
                          role: "assistant",
                          content: "What can I do for you?",
                        };
                        setMessages([miraGreeting]);
                      }}
                      className="aspect-square w-full flex flex-col items-center justify-center gap-2 bg-card border border-border/50 rounded-2xl p-3 hover:border-border transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                        <span className="text-base font-bold gradient-holographic-text">{team.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <p className="text-xs font-semibold text-center truncate w-full">{team.name}</p>
                      <p className="text-[10px] text-muted-foreground text-center truncate w-full">{team.focus}</p>
                    </button>
                  </div>
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


      {/* Input Area - only shown when in chat */}
      {hasMessages && (
        <div className="mt-auto px-4 pb-4 pt-2">
          <div className="relative flex items-center">
            <div className="relative flex-1">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10" ref={plusMenuRef}>
                <button
                  onClick={() => setShowPlusMenu(!showPlusMenu)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    showPlusMenu ? "bg-accent/15 text-accent" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  title="Add files/photos"
                >
                  <Plus className={`w-5 h-5 transition-transform ${showPlusMenu ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence>
                  {showPlusMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-0 mb-2 w-52 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <button onClick={() => setShowPlusMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Add File
                      </button>
                      <div className="h-px bg-border" />
                      <button onClick={() => setShowPlusMenu(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors">
                        <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        Add Photo
                      </button>
                      <div className="h-px bg-border" />
                      <button
                        onClick={() => { setDeepAnalysis(!deepAnalysis); setShowPlusMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <BrainCircuit className={`w-4 h-4 ${deepAnalysis ? "text-accent" : "text-muted-foreground"}`} />
                        <span className="flex-1 text-left">Enable Deep Analysis</span>
                        {deepAnalysis && <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_6px_hsl(var(--accent))]" />}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Mira anything..."
                className="w-full bg-card border border-border/50 rounded-xl pl-12 pr-12 py-3.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg gradient-holographic flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}

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
              <button onClick={() => setShowClaimAgent(false)} className="flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-sm font-semibold">Your own bot</h2>
              <div className="w-9" />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <p className="text-lg font-bold text-center mb-2">
                Connect <span className="gradient-holographic-text">Mira</span> to your platforms
              </p>
              <p className="text-sm text-muted-foreground text-center mb-10 max-w-xs">
                Bring your own agent wherever you communicate.
              </p>

              {/* Platform logos */}
              <div className="flex items-center gap-8 mb-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(200_80%_55%)] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.97 1.25-5.55 3.67-.53.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.41-1.41-.87.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.59 4.6-1.87 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">Telegram</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[hsl(235_86%_65%)] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
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
                <button className="w-full py-2.5 rounded-lg bg-[hsl(200_80%_55%)] hover:bg-[hsl(200_80%_50%)] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.03-1.97 1.25-5.55 3.67-.53.36-1 .54-1.42.53-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.41-1.41-.87.03-.24.37-.49 1.02-.74 3.99-1.74 6.65-2.89 7.99-3.44 3.81-1.59 4.6-1.87 5.12-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .38z" fill="currentColor"/>
                  </svg>
                  Get started in Telegram
                </button>
                <button className="w-full py-2.5 rounded-lg bg-[hsl(235_86%_65%)] hover:bg-[hsl(235_86%_60%)] text-white font-medium text-xs transition-colors flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" fill="currentColor"/>
                  </svg>
                  Get started in Discord
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Chat Setup Modal */}
      <AnimatePresence>
        {showNewChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center px-6"
            onClick={() => setShowNewChatModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="w-full max-w-sm bg-card border border-border rounded-2xl p-5 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 text-center">
                <h3 className="text-base font-bold text-foreground">You just hire. They do the rest.</h3>
                <p className="text-[11px] text-muted-foreground mt-1">* You can create up to 5.</p>
              </div>


              {/* Identity */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  Role Name
                  <Pencil className="w-3 h-3 text-muted-foreground/60" />
                </label>
                <input
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  placeholder="e.g. Stock Analysis Assistant"
                  className="w-full bg-secondary/60 border border-border/50 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                />
              </div>

              {/* Focus */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Target className="w-3 h-3" />
                  Focus
                  <Pencil className="w-3 h-3 text-muted-foreground/60" />
                </label>
                <input
                  value={focus}
                  onChange={(e) => setFocus(e.target.value)}
                  placeholder="e.g. Risk assessment & downside scenarios"
                  className="w-full bg-secondary/60 border border-border/50 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                />
              </div>

              {/* Start button */}
              {(() => {
                const allFilled = persona.trim() !== "" && focus.trim() !== "";
                return (
                  <button
                    onClick={allFilled ? handleConfirmNewChat : undefined}
                    disabled={!allFilled}
                    className={`w-full py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                      allFilled
                        ? "gradient-holographic text-primary-foreground hover:opacity-90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Start
                  </button>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskMiraPage;
