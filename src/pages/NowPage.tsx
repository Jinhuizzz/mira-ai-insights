import { useState } from "react";
import { X, Bookmark, Check, Send, TrendingUp, TrendingDown } from "lucide-react";
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
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [question, setQuestion] = useState("");

  const currentCard = newsCards[currentIndex];
  const isFinished = currentIndex >= newsCards.length;

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleSwipe = (dir: "left" | "right") => {
    if (dir === "left") {
      toast("We'll reduce this type of news for you.", { duration: 1000 });
    } else {
      toast("Got it! We'll prioritize this company's news.", { duration: 1000 });
    }
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setDirection(null);
      setQuestion("");
    }, 300);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
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
          onClick: () => {
            // Future: open folder picker
          },
        },
        duration: 3000,
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

  if (isFinished) {
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
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold mb-3"
          >
            Start Over
          </button>
          <button className="block mx-auto px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium">
            📰 Weekly News Recap
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-end px-4 pt-3 pb-2">
        <span className="text-xs text-muted-foreground font-mono">
          {currentIndex + 1}/{newsCards.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5 px-4 pb-2">
        {newsCards.map((_, i) => (
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
      <div className="flex-1 relative px-4 pt-1 pb-2">
        <AnimatePresence>
          <motion.div
            key={currentCard.id}
            style={{ x, rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: direction === "left" ? -400 : direction === "right" ? 400 : 0,
            }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="absolute inset-x-4 top-1 bottom-2 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-border/30"
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
              {/* Category & ticker & date */}
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

              {/* Title */}
              <h2 className="text-lg font-bold leading-tight mb-2">{currentCard.title}</h2>

              {/* Summary */}
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">{currentCard.summary}</p>

              {/* Question input */}
              <div className="relative mb-1">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                  placeholder="Ask about this news..."
                  className="w-full bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-xl pl-4 pr-10 py-2.5 text-xs outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleAskQuestion}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-primary flex items-center justify-center"
                >
                  <Send className="w-3 h-3 text-primary-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons — all same size */}
      <div className="flex items-center justify-center gap-5 pb-4 px-4">
        <button
          onClick={() => handleSwipe("left")}
          className="w-[60px] h-[60px] rounded-full border-2 border-bearish/30 bg-bearish/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <X className="w-6 h-6 text-bearish" />
        </button>
        <button
          onClick={handleBookmark}
          className={`w-[60px] h-[60px] rounded-full border-2 flex items-center justify-center active:scale-90 transition-all ${
            bookmarked.has(currentCard.id)
              ? "border-primary bg-primary/20"
              : "border-border bg-secondary"
          }`}
        >
          <Bookmark className={`w-6 h-6 ${bookmarked.has(currentCard.id) ? "text-primary fill-primary" : "text-muted-foreground"}`} />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-[60px] h-[60px] rounded-full border-2 border-bullish/30 bg-bullish/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <Check className="w-6 h-6 text-bullish" />
        </button>
      </div>
    </div>
  );
};

export default NowPage;
