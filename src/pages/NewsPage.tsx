import { useState } from "react";
import { Search, TrendingUp, TrendingDown, ChevronRight, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SparklineChart from "../components/SparklineChart";

const newsItems = [
  {
    id: 1,
    title: "Apple Announces Record Q4 Revenue, Beats Estimates",
    time: "2m ago",
    ticker: "AAPL",
    sentiment: "bullish" as const,
    image: "https://logo.clearbit.com/apple.com",
    summary: [
      "Revenue hit $94.9B, beating the $89.3B consensus estimate",
      "Services segment grew 24% YoY to record $22.3B",
      "iPhone sales exceeded expectations despite China headwinds",
    ],
    sparkline: [140, 142, 138, 145, 148, 152, 155, 158, 160, 162],
  },
  {
    id: 2,
    title: "Tesla Shares Drop After Missing Delivery Targets",
    time: "15m ago",
    ticker: "TSLA",
    sentiment: "bearish" as const,
    image: "https://logo.clearbit.com/tesla.com",
    summary: [
      "Q4 deliveries came in at 484K, below 500K estimate",
      "Increased competition in China and Europe impacting margins",
      "Cybertruck production ramp slower than anticipated",
    ],
    sparkline: [265, 260, 258, 252, 248, 245, 240, 238, 235, 230],
  },
  {
    id: 3,
    title: "Fed Signals Potential Rate Cuts in March Meeting",
    time: "32m ago",
    ticker: "SPY",
    sentiment: "bullish" as const,
    image: "https://logo.clearbit.com/federalreserve.gov",
    summary: [
      "Powell indicates inflation trending toward 2% target",
      "Market now prices 75% probability of March cut",
      "Bond yields fall sharply across the curve",
    ],
    sparkline: [475, 478, 480, 482, 485, 488, 490, 492, 495, 498],
  },
  {
    id: 4,
    title: "NVIDIA Unveils Next-Gen AI Chip Architecture",
    time: "1h ago",
    ticker: "NVDA",
    sentiment: "bullish" as const,
    image: "https://logo.clearbit.com/nvidia.com",
    summary: [
      "Blackwell Ultra architecture promises 4x inference performance",
      "Major cloud providers already committing to large orders",
      "Data center revenue expected to accelerate in 2025",
    ],
    sparkline: [680, 685, 690, 695, 702, 710, 715, 720, 725, 735],
  },
  {
    id: 5,
    title: "Microsoft Cloud Growth Slows, Stock Under Pressure",
    time: "2h ago",
    ticker: "MSFT",
    sentiment: "bearish" as const,
    image: "https://logo.clearbit.com/microsoft.com",
    summary: [
      "Azure growth decelerated to 28% from 32% last quarter",
      "AI spending weighing on operating margins",
      "Guidance for next quarter below Street expectations",
    ],
    sparkline: [420, 418, 415, 412, 408, 405, 402, 398, 395, 390],
  },
];

const NewsPage = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="px-4 py-4">
      {/* Discover Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Discover stocks, news, sectors..."
          className="w-full bg-secondary rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground transition-all"
        />
      </div>

      {/* Breaking News Label */}
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-3.5 h-3.5 text-destructive animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Breaking News</span>
      </div>

      {/* News Feed */}
      <div className="space-y-3">
        {newsItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="w-full text-left bg-card rounded-xl p-3 border border-border/50 hover:border-border transition-all"
            >
              <div className="flex gap-3">
                {/* Image */}
                <div className="w-14 h-14 rounded-lg bg-secondary flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <img src={item.image} alt="" className="w-8 h-8 object-contain" onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }} />
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium leading-tight line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                    <span className={`text-xs font-mono font-semibold flex items-center gap-1 ${
                      item.sentiment === "bullish" ? "text-bullish" : "text-bearish"
                    }`}>
                      {item.ticker}
                      {item.sentiment === "bullish" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span className="text-[10px]">
                        {item.sentiment === "bullish" ? "Bullish" : "Bearish"}
                      </span>
                    </span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform ${expandedId === item.id ? "rotate-90" : ""}`} />
              </div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="bg-card border border-t-0 border-border/50 rounded-b-xl px-4 py-3 -mt-2">
                    <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">AI Summary</div>
                    <ul className="space-y-1.5 mb-3">
                      {item.summary.map((point, i) => (
                        <li key={i} className="text-xs text-secondary-foreground flex gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{item.ticker}</span>
                      <SparklineChart data={item.sparkline} bullish={item.sentiment === "bullish"} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
