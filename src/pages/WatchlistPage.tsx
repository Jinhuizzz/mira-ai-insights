import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { ArrowLeft, TrendingUp, TrendingDown, ChevronUp, ChevronDown, Search, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SparklineChart from "../components/SparklineChart";
import LargeChart from "../components/LargeChart";
import StockDetailTabs from "../components/watchlist/StockDetailTabs";

const companyLogos: Record<string, string> = {
  AAPL: "https://logo.clearbit.com/apple.com",
  TSLA: "https://logo.clearbit.com/tesla.com",
  NVDA: "https://logo.clearbit.com/nvidia.com",
  MSFT: "https://logo.clearbit.com/microsoft.com",
  AMZN: "https://logo.clearbit.com/amazon.com",
  GOOGL: "https://logo.clearbit.com/google.com",
  META: "https://logo.clearbit.com/meta.com",
  NFLX: "https://logo.clearbit.com/netflix.com",
  AMD: "https://logo.clearbit.com/amd.com",
  INTC: "https://logo.clearbit.com/intel.com",
};

const marketIndices = [
  { name: "S&P 500", value: 5234.18, change: 0.87 },
  { name: "Dow Jones", value: 39512.84, change: -0.22 },
  { name: "Nasdaq", value: 16388.24, change: 1.14 },
];

const allStocksPool = [
  { ticker: "GOOGL", name: "Alphabet Inc.", price: 141.80, change: 1.92, changePct: 1.37 },
  { ticker: "META", name: "Meta Platforms", price: 485.20, change: 7.30, changePct: 1.53 },
  { ticker: "NFLX", name: "Netflix Inc.", price: 628.50, change: -3.15, changePct: -0.50 },
  { ticker: "AMD", name: "Advanced Micro Devices", price: 162.35, change: 4.20, changePct: 2.65 },
  { ticker: "INTC", name: "Intel Corp.", price: 43.80, change: -0.95, changePct: -2.12 },
];

const defaultWatchlist = [
  {
    ticker: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.34, changePct: 1.25,
    sparkline: [182, 184, 183, 186, 185, 187, 188, 189, 190, 189.84],
    chartData: [
      { date: "Jan", value: 175 }, { date: "Feb", value: 178 }, { date: "Mar", value: 182 },
      { date: "Apr", value: 180 }, { date: "May", value: 185 }, { date: "Jun", value: 188 },
      { date: "Jul", value: 186 }, { date: "Aug", value: 190 }, { date: "Sep", value: 189.84 },
    ],
    marketCap: "$2.95T", peRatio: "31.2", volume: "54.3M", avgVolume: "58.1M",
    high52w: "$199.62", low52w: "$164.08", dividend: "0.55%", eps: "$6.13",
    sector: "Technology",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  },
  {
    ticker: "TSLA", name: "Tesla Inc.", price: 232.15, change: -8.42, changePct: -3.5,
    sparkline: [265, 260, 255, 250, 245, 240, 238, 235, 233, 232.15],
    chartData: [
      { date: "Jan", value: 265 }, { date: "Feb", value: 258 }, { date: "Mar", value: 250 },
      { date: "Apr", value: 255 }, { date: "May", value: 248 }, { date: "Jun", value: 242 },
      { date: "Jul", value: 245 }, { date: "Aug", value: 238 }, { date: "Sep", value: 232.15 },
    ],
    marketCap: "$738B", peRatio: "72.8", volume: "112.5M", avgVolume: "98.3M",
    high52w: "$299.29", low52w: "$152.37", dividend: "—", eps: "$3.19",
    sector: "Consumer Discretionary",
    description: "Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, energy generation and storage systems.",
  },
  {
    ticker: "NVDA", name: "NVIDIA Corp.", price: 735.50, change: 18.65, changePct: 2.6,
    sparkline: [680, 690, 700, 705, 710, 715, 720, 725, 730, 735.5],
    chartData: [
      { date: "Jan", value: 620 }, { date: "Feb", value: 650 }, { date: "Mar", value: 680 },
      { date: "Apr", value: 670 }, { date: "May", value: 700 }, { date: "Jun", value: 710 },
      { date: "Jul", value: 695 }, { date: "Aug", value: 720 }, { date: "Sep", value: 735.5 },
    ],
    marketCap: "$1.81T", peRatio: "65.4", volume: "42.1M", avgVolume: "45.8M",
    high52w: "$756.06", low52w: "$392.30", dividend: "0.02%", eps: "$11.24",
    sector: "Technology",
    description: "NVIDIA Corporation provides graphics, computing and networking solutions.",
  },
  {
    ticker: "MSFT", name: "Microsoft Corp.", price: 390.25, change: -5.18, changePct: -1.31,
    sparkline: [420, 415, 410, 408, 405, 400, 398, 395, 392, 390.25],
    chartData: [
      { date: "Jan", value: 415 }, { date: "Feb", value: 420 }, { date: "Mar", value: 410 },
      { date: "Apr", value: 405 }, { date: "May", value: 400 }, { date: "Jun", value: 408 },
      { date: "Jul", value: 402 }, { date: "Aug", value: 395 }, { date: "Sep", value: 390.25 },
    ],
    marketCap: "$2.90T", peRatio: "35.1", volume: "22.8M", avgVolume: "25.4M",
    high52w: "$430.82", low52w: "$309.45", dividend: "0.72%", eps: "$11.12",
    sector: "Technology",
    description: "Microsoft Corporation develops and supports software, services, devices and solutions worldwide.",
  },
  {
    ticker: "AMZN", name: "Amazon.com Inc.", price: 178.92, change: 3.45, changePct: 1.96,
    sparkline: [165, 168, 170, 172, 174, 175, 176, 177, 178, 178.92],
    chartData: [
      { date: "Jan", value: 155 }, { date: "Feb", value: 160 }, { date: "Mar", value: 165 },
      { date: "Apr", value: 162 }, { date: "May", value: 170 }, { date: "Jun", value: 172 },
      { date: "Jul", value: 168 }, { date: "Aug", value: 175 }, { date: "Sep", value: 178.92 },
    ],
    marketCap: "$1.86T", peRatio: "58.3", volume: "48.7M", avgVolume: "52.1M",
    high52w: "$189.77", low52w: "$118.35", dividend: "—", eps: "$3.07",
    sector: "Consumer Discretionary",
    description: "Amazon.com, Inc. engages in the retail sale of consumer products, advertising, and subscription services.",
  },
];

type SortKey = "symbol" | "change";
type SortDir = "asc" | "desc";

interface WatchlistPageProps {
  onSubPageChange?: (isSubPage: boolean) => void;
  showAddStock?: boolean;
  onCloseAddStock?: () => void;
}

const WatchlistPage = ({ onSubPageChange, showAddStock, onCloseAddStock }: WatchlistPageProps) => {
  const [selected, setSelected] = useState<typeof defaultWatchlist[0] | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("symbol");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [watchlistTickers, setWatchlistTickers] = useState<string[]>([]);
  const [addStockSearch, setAddStockSearch] = useState("");

  useEffect(() => {
    if (showAddStock) {
      onSubPageChange?.(true);
    }
  }, [showAddStock]);

  const watchlistData = useMemo(() => defaultWatchlist.filter(s => watchlistTickers.includes(s.ticker)), [watchlistTickers]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedStocks = useMemo(() => {
    const sorted = [...watchlistData];
    sorted.sort((a, b) => {
      if (sortKey === "symbol") {
        return sortDir === "asc" ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker);
      }
      return sortDir === "asc" ? a.changePct - b.changePct : b.changePct - a.changePct;
    });
    return sorted;
  }, [watchlistData, sortKey, sortDir]);

  const filteredAddStocks = useMemo(() => {
    return allStocksPool.filter(s =>
      !watchlistTickers.includes(s.ticker) &&
      (s.ticker.toLowerCase().includes(addStockSearch.toLowerCase()) ||
       s.name.toLowerCase().includes(addStockSearch.toLowerCase()))
    );
  }, [addStockSearch, watchlistTickers]);

  const handleAddStock = (ticker: string) => {
    setWatchlistTickers(prev => [...prev, ticker]);
    toast.success(`${ticker} added to watchlist`);
  };

  const handleRemoveStock = (ticker: string) => {
    setWatchlistTickers(prev => prev.filter(t => t !== ticker));
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 text-muted-foreground/40" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  if (showAddStock) {
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
            onClick={() => { onCloseAddStock?.(); onSubPageChange?.(false); setAddStockSearch(""); }}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold">Add Stock</h2>
            <p className="text-xs text-muted-foreground">Search and add stocks to your watchlist</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ticker or name..."
            value={addStockSearch}
            onChange={(e) => setAddStockSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            autoFocus
          />
        </div>

        {/* Available stocks */}
        <div className="flex flex-col gap-2">
          {filteredAddStocks.map((stock, i) => (
            <motion.div
              key={stock.ticker}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={companyLogos[stock.ticker] || ""}
                  alt={stock.name}
                  className="w-8 h-8 rounded-lg bg-secondary object-contain"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div>
                  <div className="text-sm font-bold font-mono">{stock.ticker}</div>
                  <div className="text-xs text-muted-foreground">{stock.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-mono font-semibold">${stock.price.toFixed(2)}</div>
                  <div className={`text-xs font-mono ${stock.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                    {stock.change >= 0 ? "+" : ""}{stock.changePct.toFixed(2)}%
                  </div>
                </div>
                <button
                  onClick={() => handleAddStock(stock.ticker)}
                  className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          {filteredAddStocks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">
              {addStockSearch ? "No matching stocks found" : "All available stocks are in your watchlist"}
            </p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="px-4 py-4">
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-1">
              <button
                onClick={() => { setSelected(null); onSubPageChange?.(false); }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={companyLogos[selected.ticker]}
                alt={selected.name}
                className="w-10 h-10 rounded-xl bg-secondary object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-2xl font-bold font-mono">{selected.ticker}</h2>
                  <span className="text-sm text-muted-foreground">{selected.name}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono">${selected.price.toFixed(2)}</span>
                  <span className={`text-sm font-mono font-semibold flex items-center gap-1 ${selected.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                    {selected.change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {selected.change >= 0 ? "+" : ""}{selected.change.toFixed(2)} ({selected.changePct.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-card rounded-xl border border-border/50 p-3 my-4">
              <LargeChart data={selected.chartData} bullish={selected.change >= 0} />
            </div>

            {/* Time Range */}
            <div className="flex justify-center gap-1 mb-5">
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((range, i) => (
                <button
                  key={range}
                  className={`text-xs font-medium px-3 py-1 rounded-md transition-colors ${
                    i === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Detail Tabs */}
            <StockDetailTabs stock={selected} />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Market Indices */}
            <div className="flex gap-2 mb-5">
              {marketIndices.map((idx) => {
                const up = idx.change >= 0;
                return (
                  <div
                    key={idx.name}
                    className="flex-1 bg-card rounded-xl border border-border/50 p-2.5"
                  >
                    <div className="text-[10px] text-muted-foreground font-medium truncate">{idx.name}</div>
                    <div className="text-xs font-mono font-semibold mt-0.5">
                      {idx.value.toLocaleString()}
                    </div>
                    <div className={`text-[10px] font-mono font-semibold flex items-center gap-0.5 ${up ? "text-bullish" : "text-bearish"}`}>
                      {up ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                      {up ? "+" : ""}{idx.change.toFixed(2)}%
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Header */}
            <div className="flex items-center px-3 mb-2">
              <button
                onClick={() => toggleSort("symbol")}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold hover:text-foreground transition-colors"
              >
                Symbol <SortIcon col="symbol" />
              </button>
              <div className="flex-1" />
              <button
                onClick={() => toggleSort("change")}
                className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold hover:text-foreground transition-colors"
              >
                % Change <SortIcon col="change" />
              </button>
            </div>

            {/* Stock List */}
            {sortedStocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
                  We'll push relevant news to you based on the stocks you add to your watchlist.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {sortedStocks.map((stock, i) => {
                  const bullish = stock.change >= 0;
                  return (
                    <motion.button
                      key={stock.ticker}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { setSelected(stock); onSubPageChange?.(true); }}
                      className="w-full bg-card rounded-xl p-3 border border-border/50 hover:border-border transition-all flex items-center gap-3"
                    >
                      <img
                        src={companyLogos[stock.ticker]}
                        alt={stock.name}
                        className="w-9 h-9 rounded-lg bg-secondary object-contain shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = "";
                          e.currentTarget.className = "w-9 h-9 rounded-lg bg-secondary shrink-0 flex items-center justify-center";
                        }}
                      />
                      <div className="flex-1 text-left">
                        <div className="text-sm font-bold font-mono">{stock.ticker}</div>
                        <div className="text-xs text-muted-foreground">{stock.name}</div>
                      </div>
                      <SparklineChart data={stock.sparkline} bullish={bullish} />
                      <div className="text-right min-w-[70px]">
                        <div className="text-sm font-mono font-semibold">${stock.price.toFixed(2)}</div>
                        <div className={`text-xs font-mono ${bullish ? "text-bullish" : "text-bearish"}`}>
                          {bullish ? "+" : ""}{stock.changePct.toFixed(2)}%
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchlistPage;
