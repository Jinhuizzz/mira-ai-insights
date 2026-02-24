import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Users, ExternalLink } from "lucide-react";

interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  marketCap: string;
  peRatio: string;
  volume: string;
  avgVolume: string;
  high52w: string;
  low52w: string;
  dividend: string;
  eps: string;
  sector: string;
  description: string;
}

interface StockDetailTabsProps {
  stock: StockData;
}

const tabs = ["Overview", "News", "Analyst Consensus"] as const;
type Tab = (typeof tabs)[number];

const StockDetailTabs = ({ stock }: StockDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-1 bg-secondary/60 rounded-lg p-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative flex-1 text-xs font-medium py-2 px-2 rounded-md transition-colors z-10"
          >
            {activeTab === tab && (
              <motion.div
                layoutId="stockDetailTab"
                className="absolute inset-0 bg-card rounded-md border border-border/50"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className={`relative z-10 ${activeTab === tab ? "text-foreground" : "text-muted-foreground"}`}>
              {tab}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === "Overview" && <OverviewTab stock={stock} />}
          {activeTab === "News" && <NewsTab ticker={stock.ticker} name={stock.name} />}
          {activeTab === "Analyst Consensus" && <AnalystTab ticker={stock.ticker} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ── Overview ── */
const OverviewTab = ({ stock }: { stock: StockData }) => {
  const metrics = [
    { label: "Market Cap", value: stock.marketCap },
    { label: "P/E Ratio", value: stock.peRatio },
    { label: "Volume", value: stock.volume },
    { label: "Avg Volume", value: stock.avgVolume },
    { label: "52W High", value: stock.high52w },
    { label: "52W Low", value: stock.low52w },
    { label: "Dividend Yield", value: stock.dividend },
    { label: "EPS", value: stock.eps },
  ];

  return (
    <div className="space-y-4">
      {/* About */}
      <div className="bg-card rounded-xl border border-border/50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">About {stock.name}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">{stock.description}</p>
        <div className="mt-2">
          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">{stock.sector}</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="bg-card rounded-xl border border-border/50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Statistics</div>
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
              <span className="text-xs text-muted-foreground">{m.label}</span>
              <span className="text-xs font-mono font-semibold">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── News ── */
const newsItems = [
  { id: 1, title: "Strong quarterly earnings beat expectations", source: "Reuters", time: "2h ago", sentiment: "bullish" as const },
  { id: 2, title: "Analyst upgrades stock rating to overweight", source: "Bloomberg", time: "5h ago", sentiment: "bullish" as const },
  { id: 3, title: "New product launch scheduled for next quarter", source: "CNBC", time: "8h ago", sentiment: "neutral" as const },
  { id: 4, title: "Industry headwinds may impact margins", source: "WSJ", time: "1d ago", sentiment: "bearish" as const },
  { id: 5, title: "Insider buying activity detected this week", source: "MarketWatch", time: "1d ago", sentiment: "bullish" as const },
];

const NewsTab = ({ ticker, name }: { ticker: string; name: string }) => (
  <div className="space-y-2">
    {newsItems.map((item) => (
      <div key={item.id} className="bg-card rounded-xl border border-border/50 p-3 flex gap-3 items-start">
        <div className="flex-1">
          <p className="text-sm font-medium leading-tight mb-1">{item.title}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{item.source}</span>
            <span>·</span>
            <span>{item.time}</span>
            <span className={`ml-auto px-1.5 py-0.5 rounded text-[10px] font-medium ${
              item.sentiment === "bullish" ? "bg-bullish/20 text-bullish" : 
              item.sentiment === "bearish" ? "bg-bearish/20 text-bearish" : 
              "bg-secondary text-muted-foreground"
            }`}>
              {item.sentiment}
            </span>
          </div>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
      </div>
    ))}
  </div>
);

/* ── Analyst Consensus ── */
const analystData: Record<string, { consensus: string; target: string; ratings: { label: string; count: number; color: string }[] }> = {
  AAPL: { consensus: "Buy", target: "$210.00", ratings: [
    { label: "Strong Buy", count: 18, color: "hsl(145, 100%, 45%)" },
    { label: "Buy", count: 12, color: "hsl(145, 70%, 55%)" },
    { label: "Hold", count: 6, color: "hsl(45, 80%, 55%)" },
    { label: "Sell", count: 1, color: "hsl(348, 100%, 55%)" },
  ]},
  TSLA: { consensus: "Hold", target: "$260.00", ratings: [
    { label: "Strong Buy", count: 8, color: "hsl(145, 100%, 45%)" },
    { label: "Buy", count: 10, color: "hsl(145, 70%, 55%)" },
    { label: "Hold", count: 14, color: "hsl(45, 80%, 55%)" },
    { label: "Sell", count: 5, color: "hsl(348, 100%, 55%)" },
  ]},
  NVDA: { consensus: "Buy", target: "$800.00", ratings: [
    { label: "Strong Buy", count: 25, color: "hsl(145, 100%, 45%)" },
    { label: "Buy", count: 10, color: "hsl(145, 70%, 55%)" },
    { label: "Hold", count: 3, color: "hsl(45, 80%, 55%)" },
    { label: "Sell", count: 0, color: "hsl(348, 100%, 55%)" },
  ]},
  MSFT: { consensus: "Buy", target: "$430.00", ratings: [
    { label: "Strong Buy", count: 20, color: "hsl(145, 100%, 45%)" },
    { label: "Buy", count: 14, color: "hsl(145, 70%, 55%)" },
    { label: "Hold", count: 4, color: "hsl(45, 80%, 55%)" },
    { label: "Sell", count: 0, color: "hsl(348, 100%, 55%)" },
  ]},
  AMZN: { consensus: "Buy", target: "$200.00", ratings: [
    { label: "Strong Buy", count: 22, color: "hsl(145, 100%, 45%)" },
    { label: "Buy", count: 11, color: "hsl(145, 70%, 55%)" },
    { label: "Hold", count: 5, color: "hsl(45, 80%, 55%)" },
    { label: "Sell", count: 1, color: "hsl(348, 100%, 55%)" },
  ]},
};

const AnalystTab = ({ ticker }: { ticker: string }) => {
  const data = analystData[ticker] || analystData.AAPL;
  const totalRatings = data.ratings.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="space-y-4">
      {/* Consensus Badge */}
      <div className="bg-card rounded-xl border border-border/50 p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Analyst Consensus</div>
          <div className={`text-xl font-bold ${data.consensus === "Buy" ? "text-bullish" : "text-foreground"}`}>
            {data.consensus}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1">Price Target</div>
          <div className="text-xl font-bold font-mono">{data.target}</div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-card rounded-xl border border-border/50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Rating Distribution
          <span className="text-muted-foreground/60 ml-1 normal-case">({totalRatings} analysts)</span>
        </div>

        {/* Bar Chart */}
        <div className="space-y-2.5">
          {data.ratings.map((r) => {
            const pct = totalRatings > 0 ? (r.count / totalRatings) * 100 : 0;
            return (
              <div key={r.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-20 shrink-0">{r.label}</span>
                <div className="flex-1 h-5 bg-secondary/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                </div>
                <span className="text-xs font-mono font-semibold w-6 text-right">{r.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysts count */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
        <Users className="w-3.5 h-3.5" />
        Based on {totalRatings} Wall Street analysts
      </div>
    </div>
  );
};

export default StockDetailTabs;
