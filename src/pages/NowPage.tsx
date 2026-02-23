import { useState } from "react";
import { X, Bookmark, Check, Send, TrendingUp, TrendingDown, FolderOpen, Plus, RotateCcw } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { toast } from "sonner";

const newsCards = [
  {
    id: 1,
    title: "Apple Announces Record Q4 Revenue, Beats Estimates",
    date: "Oct 24, 2025",
    time: "2m ago",
    ticker: "AAPL",
    sentiment: "bullish" as const,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
    summary: "Revenue hit $94.9B, beating the $89.3B consensus estimate. Services segment grew 24% YoY.",
    detail: "Apple reported Q4 FY2025 revenue of $94.9B, surpassing the $89.3B Wall Street consensus. iPhone revenue grew 8% to $46.2B. The Services segment was a standout performer, growing 24% YoY to $24.3B. CEO Tim Cook highlighted strong demand in emerging markets and the success of Apple Intelligence features. Gross margin expanded to 46.2%, up from 45.2% last year. The company announced a $110B share buyback program and raised its dividend by 4%.",
    category: "Earnings",
  },
  {
    id: 2,
    title: "Tesla Shares Drop After Missing Delivery Targets",
    date: "Oct 23, 2025",
    time: "15m ago",
    ticker: "TSLA",
    sentiment: "bearish" as const,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    summary: "Q4 deliveries came in at 484K, below 500K estimate. Increased competition in China impacting margins.",
    detail: "Tesla delivered 484,507 vehicles in Q4, missing the 500K consensus estimate by 3.1%. China deliveries fell 12% QoQ amid intensifying competition from BYD and Xiaomi. Automotive gross margin declined to 17.1% from 18.9%. The Cybertruck ramp remains slower than expected. Elon Musk reiterated long-term goals around robotaxi and FSD but offered no concrete timeline updates. Energy storage revenue grew 52% YoY, providing a bright spot.",
    category: "Earnings",
  },
  {
    id: 3,
    title: "Fed Signals Potential Rate Cuts in March Meeting",
    date: "Oct 22, 2025",
    time: "32m ago",
    ticker: "SPY",
    sentiment: "bullish" as const,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop",
    summary: "Powell indicates inflation trending toward 2% target. Market now prices 75% probability of March cut.",
    detail: "Fed Chair Jerome Powell signaled that the FOMC is 'gaining greater confidence' that inflation is moving sustainably toward 2%. The latest PCE reading came in at 2.3%, down from 2.7% three months ago. The dot plot now suggests three 25bp cuts in 2025, up from two previously. Treasury yields fell sharply, with the 10-year dropping 15bps to 3.85%. Equity markets rallied broadly, with the S&P 500 gaining 1.8% on the day.",
    category: "Macro",
  },
  {
    id: 4,
    title: "NVIDIA Unveils Next-Gen AI Chip Architecture",
    date: "Oct 21, 2025",
    time: "1h ago",
    ticker: "NVDA",
    sentiment: "bullish" as const,
    image: "https://images.unsplash.com/photo-1640955014216-75201056c829?w=800&h=600&fit=crop",
    summary: "Blackwell Ultra architecture promises 4x inference performance. Major cloud providers committing to orders.",
    detail: "NVIDIA announced the Blackwell Ultra GPU architecture at its GTC event, claiming 4x inference throughput over the current Hopper generation. AWS, Azure, and GCP have all committed to large-scale deployments. The chip features 208B transistors on TSMC's 3nm process. Jensen Huang projected data center revenue will exceed $200B annually by 2027. The company also unveiled NIM microservices for enterprise AI deployment, targeting the $150B enterprise software market.",
    category: "Tech",
  },
  {
    id: 5,
    title: "Microsoft Cloud Growth Slows, Stock Under Pressure",
    date: "Oct 20, 2025",
    time: "2h ago",
    ticker: "MSFT",
    sentiment: "bearish" as const,
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&h=600&fit=crop",
    summary: "Azure growth decelerated to 28% from 32% last quarter. AI spending weighing on operating margins.",
    detail: "Microsoft reported Azure revenue growth of 28%, down from 32% in Q3 and below the 30% Street estimate. Total Intelligent Cloud revenue was $25.5B. Capital expenditures surged to $14.2B, up 55% YoY, driven by AI infrastructure buildout. Operating margin contracted 180bps to 42.1%. Copilot adoption reached 1.3M paid seats but monetization per seat remains modest. CFO Amy Hood guided for further capex increases in coming quarters.",
    category: "Earnings",
  },
];

interface NowPageProps {
  onAskMira: (context: { title: string; summary: string; ticker: string; question: string }) => void;
}

const SWIPE_THRESHOLD = 100;

const NowPage = ({ onAskMira }: NowPageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [showFolderPicker, setShowFolderPicker] = useState(false);
  const [folders] = useState(["General", "Earnings", "Tech", "Macro"]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [question, setQuestion] = useState("");
  const [recapMode, setRecapMode] = useState(false);
  const [activeCards, setActiveCards] = useState(newsCards);
  const [flipped, setFlipped] = useState(false);
  const [showRecapView, setShowRecapView] = useState(false);

  const currentCard = activeCards[currentIndex];
  const isFinished = currentIndex >= activeCards.length;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left") {
      toast("We'll reduce this type of news for you.", { duration: 1000 });
    } else {
      toast("Got it! We'll prioritize this company's news.", { duration: 1000 });
      if (!recapMode) {
        setLikedIds((prev) => new Set(prev).add(activeCards[currentIndex].id));
      }
    }
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setDirection(null);
      setQuestion("");
      setFlipped(false);
    }, 300);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (flipped) return;
    if (info.offset.x > SWIPE_THRESHOLD) {
      handleSwipe("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      handleSwipe("left");
    }
  };

  const handleBookmark = () => {
    if (!currentCard) return;
    const isAlreadyBookmarked = bookmarked.has(currentCard.id);
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(currentCard.id)) next.delete(currentCard.id);
      else next.add(currentCard.id);
      return next;
    });
    if (!isAlreadyBookmarked) {
      toast("Saved to your bookmarks", {
        action: {
          label: "Change",
          onClick: () => setShowFolderPicker(true),
        },
        duration: 2000,
      });
    }
  };

  const handleAskQuestion = () => {
    if (!question.trim() || !currentCard) return;
    onAskMira({
      title: currentCard.title,
      summary: currentCard.summary,
      ticker: currentCard.ticker,
      question: question.trim(),
    });
    setQuestion("");
  };

  // Recap stacked cards view
  if (showRecapView) {
    const likedCards = newsCards.filter((c) => likedIds.has(c.id));

    if (likedCards.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold mb-2">No liked news yet</h2>
            <p className="text-sm text-muted-foreground mb-6">Swipe right on news you're interested in to see them here.</p>
            <button
              onClick={() => {
                setShowRecapView(false);
                setCurrentIndex(0);
                setActiveCards(newsCards);
                setRecapMode(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold"
            >
              Go Back
            </button>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-[calc(100vh-8rem)] px-4 pt-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">📰 Weekly Recap</h2>
          <button
            onClick={() => {
              setShowRecapView(false);
              setCurrentIndex(0);
              setActiveCards(newsCards);
              setRecapMode(false);
            }}
            className="text-xs text-muted-foreground px-3 py-1.5 rounded-lg bg-secondary"
          >
            Back
          </button>
        </div>
        <div className="relative flex-1">
          {/* Stacked cards */}
          <div className="space-y-3">
            {likedCards.map((card, i) => (
              <RecapCard key={card.id} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const likedCards = newsCards.filter((c) => likedIds.has(c.id));
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 glow-primary">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">You're all caught up!</h2>
          <p className="text-sm text-muted-foreground mb-6">Check back later for more breaking news.</p>
          <div className="flex flex-col gap-3 w-full max-w-[240px] mx-auto">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setActiveCards(newsCards);
                setRecapMode(false);
                setFlipped(false);
              }}
              className="w-full px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
            >
              Start Over
            </button>
            <button
              onClick={() => setShowRecapView(true)}
              className="w-full px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
            >
              📰 Weekly News Recap
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] relative overflow-hidden">
      {/* Folder Picker Overlay */}
      <AnimatePresence>
        {showFolderPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-end justify-center pb-24"
            onClick={() => setShowFolderPicker(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border/50 rounded-2xl w-[85%] p-4 shadow-xl"
            >
              <h3 className="text-sm font-semibold mb-3">Move to folder</h3>
              <div className="flex flex-col gap-1.5">
                {folders.map((folder) => (
                  <button
                    key={folder}
                    onClick={() => {
                      toast(`Moved to "${folder}"`, { duration: 1000 });
                      setShowFolderPicker(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/80 transition-colors text-left"
                  >
                    <FolderOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm">{folder}</span>
                  </button>
                ))}
                <button
                  onClick={() => {
                    toast("New folder created", { duration: 1000 });
                    setShowFolderPicker(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary/80 transition-colors text-left text-muted-foreground"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">New Folder</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-end px-4 pt-3 pb-2">
        <span className="text-xs text-muted-foreground font-mono">
          {currentIndex + 1}/{activeCards.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 px-4 pb-2">
        {activeCards.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full flex-1 transition-all duration-300 ${
              i < currentIndex
                ? "bg-primary"
                : i === currentIndex
                ? "bg-primary/70"
                : "bg-secondary"
            }`}
          />
        ))}
      </div>

      {/* Card stack area */}
      <div className="flex-1 relative px-4 pt-1 pb-2" style={{ perspective: 1200 }}>
        <AnimatePresence>
          <motion.div
            key={currentCard.id}
            style={{ transformStyle: "preserve-3d", ...(!flipped ? { x, rotate } : {}) }}
            drag={!flipped ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: direction === "left" ? -400 : direction === "right" ? 400 : 0,
              rotateY: flipped ? 180 : 0,
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="absolute inset-x-4 top-1 bottom-2 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-border/30"
            onClick={() => setFlipped(!flipped)}
          >
            {/* Front face */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={currentCard.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              </div>

              {/* Swipe indicators */}
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-8 left-6 z-10 border-4 border-bullish rounded-xl px-4 py-2 rotate-[-15deg]"
              >
                <span className="text-bullish text-2xl font-black tracking-wider">LIKE</span>
              </motion.div>
              <motion.div
                style={{ opacity: nopeOpacity }}
                className="absolute top-8 right-6 z-10 border-4 border-bearish rounded-xl px-4 py-2 rotate-[15deg]"
              >
                <span className="text-bearish text-2xl font-black tracking-wider">NOPE</span>
              </motion.div>

              {/* Card content - bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-secondary/80 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-muted-foreground">
                    {currentCard.category}
                  </span>
                  <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                    currentCard.sentiment === "bullish" ? "text-bullish" : "text-bearish"
                  }`}>
                    {currentCard.ticker}
                    {currentCard.sentiment === "bullish" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{currentCard.date}</span>
                </div>
                <h2 className="text-lg font-bold leading-tight mb-2">{currentCard.title}</h2>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{currentCard.summary}</p>
                <p className="text-[10px] text-muted-foreground/60 text-center">Tap to read more</p>
              </div>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 bg-card rounded-2xl overflow-y-auto"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="p-5 pt-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-secondary rounded-full px-2.5 py-0.5 text-muted-foreground">
                    {currentCard.category}
                  </span>
                  <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                    currentCard.sentiment === "bullish" ? "text-bullish" : "text-bearish"
                  }`}>
                    {currentCard.ticker}
                    {currentCard.sentiment === "bullish" ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                  </span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{currentCard.time}</span>
                </div>

                <h2 className="text-base font-bold leading-tight mb-4">{currentCard.title}</h2>

                <p className="text-sm text-foreground/80 leading-relaxed mb-5">
                  {currentCard.detail}
                </p>

                {/* Question input */}
                <div className="relative mb-2">
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Ask about this news..."
                    className="w-full bg-secondary/80 border border-border/50 rounded-xl pl-4 pr-10 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAskQuestion(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-primary flex items-center justify-center"
                  >
                    <Send className="w-3 h-3 text-primary-foreground" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground/60 text-center mt-3">Tap to flip back</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-5 pb-4 px-4">
        <button
          onClick={() => handleSwipe("left")}
          className="w-11 h-11 rounded-full border-2 border-bearish/30 bg-bearish/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <X className="w-5 h-5 text-bearish" />
        </button>
        <button
          onClick={handleBookmark}
          className={`w-11 h-11 rounded-full border-2 flex items-center justify-center active:scale-90 transition-all ${
            bookmarked.has(currentCard.id)
              ? "border-primary bg-primary/20"
              : "border-border bg-secondary"
          }`}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked.has(currentCard.id) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-11 h-11 rounded-full border-2 border-bullish/30 bg-bullish/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <Check className="w-5 h-5 text-bullish" />
        </button>
      </div>
    </div>
  );
};

/** Recap card component – a mini card for the stacked recap view */
const RecapCard = ({ card, index }: { card: typeof newsCards[number]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -1 : 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.08, type: "spring", damping: 20 }}
      onClick={() => setExpanded(!expanded)}
      className="bg-card border border-border/30 rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex gap-3 p-3">
        <img
          src={card.image}
          alt=""
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono font-bold flex items-center gap-0.5 ${
              card.sentiment === "bullish" ? "text-bullish" : "text-bearish"
            }`}>
              {card.ticker}
              {card.sentiment === "bullish" ? (
                <TrendingUp className="w-2.5 h-2.5" />
              ) : (
                <TrendingDown className="w-2.5 h-2.5" />
              )}
            </span>
            <span className="text-[10px] text-muted-foreground">{card.date}</span>
          </div>
          <h3 className="text-xs font-semibold leading-snug line-clamp-2">{card.title}</h3>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NowPage;
