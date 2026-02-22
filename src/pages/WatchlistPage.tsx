import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SparklineChart from "../components/SparklineChart";
import LargeChart from "../components/LargeChart";

const watchlistData = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: 189.84,
    change: 2.34,
    changePct: 1.25,
    sparkline: [182, 184, 183, 186, 185, 187, 188, 189, 190, 189.84],
    chartData: [
      { date: "Jan", value: 175 }, { date: "Feb", value: 178 }, { date: "Mar", value: 182 },
      { date: "Apr", value: 180 }, { date: "May", value: 185 }, { date: "Jun", value: 188 },
      { date: "Jul", value: 186 }, { date: "Aug", value: 190 }, { date: "Sep", value: 189.84 },
    ],
    tradeSetup: "Bullish continuation above $188 support. Target $195, stop $185.",
    keyLevels: { support: "$185.50", resistance: "$195.20", pivot: "$189.00" },
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    price: 232.15,
    change: -8.42,
    changePct: -3.5,
    sparkline: [265, 260, 255, 250, 245, 240, 238, 235, 233, 232.15],
    chartData: [
      { date: "Jan", value: 265 }, { date: "Feb", value: 258 }, { date: "Mar", value: 250 },
      { date: "Apr", value: 255 }, { date: "May", value: 248 }, { date: "Jun", value: 242 },
      { date: "Jul", value: 245 }, { date: "Aug", value: 238 }, { date: "Sep", value: 232.15 },
    ],
    tradeSetup: "Bearish breakdown below $235 key level. Watch for bounce at $225.",
    keyLevels: { support: "$225.00", resistance: "$245.80", pivot: "$235.00" },
  },
  {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    price: 735.50,
    change: 18.65,
    changePct: 2.6,
    sparkline: [680, 690, 700, 705, 710, 715, 720, 725, 730, 735.5],
    chartData: [
      { date: "Jan", value: 620 }, { date: "Feb", value: 650 }, { date: "Mar", value: 680 },
      { date: "Apr", value: 670 }, { date: "May", value: 700 }, { date: "Jun", value: 710 },
      { date: "Jul", value: 695 }, { date: "Aug", value: 720 }, { date: "Sep", value: 735.5 },
    ],
    tradeSetup: "Strong uptrend. AI demand narrative intact. Buy dips to $710.",
    keyLevels: { support: "$710.00", resistance: "$750.00", pivot: "$725.00" },
  },
  {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    price: 390.25,
    change: -5.18,
    changePct: -1.31,
    sparkline: [420, 415, 410, 408, 405, 400, 398, 395, 392, 390.25],
    chartData: [
      { date: "Jan", value: 415 }, { date: "Feb", value: 420 }, { date: "Mar", value: 410 },
      { date: "Apr", value: 405 }, { date: "May", value: 400 }, { date: "Jun", value: 408 },
      { date: "Jul", value: 402 }, { date: "Aug", value: 395 }, { date: "Sep", value: 390.25 },
    ],
    tradeSetup: "Consolidation phase. Watch for break below $388 for short setup.",
    keyLevels: { support: "$385.00", resistance: "$410.50", pivot: "$398.00" },
  },
  {
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.92,
    change: 3.45,
    changePct: 1.96,
    sparkline: [165, 168, 170, 172, 174, 175, 176, 177, 178, 178.92],
    chartData: [
      { date: "Jan", value: 155 }, { date: "Feb", value: 160 }, { date: "Mar", value: 165 },
      { date: "Apr", value: 162 }, { date: "May", value: 170 }, { date: "Jun", value: 172 },
      { date: "Jul", value: 168 }, { date: "Aug", value: 175 }, { date: "Sep", value: 178.92 },
    ],
    tradeSetup: "Bullish breakout above $175 resistance. Target $185.",
    keyLevels: { support: "$172.00", resistance: "$185.00", pivot: "$176.50" },
  },
];

const WatchlistPage = () => {
  const [selected, setSelected] = useState<typeof watchlistData[0] | null>(null);

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
            {/* Detail View */}
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-2xl font-bold font-mono">{selected.ticker}</h2>
              <span className="text-sm text-muted-foreground">{selected.name}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold font-mono">${selected.price.toFixed(2)}</span>
              <span className={`text-sm font-mono font-semibold flex items-center gap-1 ${selected.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                {selected.change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {selected.change >= 0 ? "+" : ""}{selected.change.toFixed(2)} ({selected.changePct.toFixed(2)}%)
              </span>
            </div>

            {/* Large Chart */}
            <div className="bg-card rounded-xl border border-border/50 p-3 mb-4">
              <LargeChart data={selected.chartData} bullish={selected.change >= 0} />
            </div>

            {/* Time Range Selector */}
            <div className="flex justify-center gap-1 mb-6">
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

            {/* Trade Setup */}
            <div className="bg-card rounded-xl border border-border/50 p-4 mb-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">AI Trade Setup</div>
              <p className="text-sm leading-relaxed">{selected.tradeSetup}</p>
            </div>

            {/* Key Levels */}
            <div className="bg-card rounded-xl border border-border/50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Key Levels</div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">Support</div>
                  <div className="text-sm font-mono font-semibold text-bearish">{selected.keyLevels.support}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Pivot</div>
                  <div className="text-sm font-mono font-semibold">{selected.keyLevels.pivot}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Resistance</div>
                  <div className="text-sm font-mono font-semibold text-bullish">{selected.keyLevels.resistance}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Watchlist Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold">Watchlist</h2>
                <p className="text-sm text-muted-foreground">{watchlistData.length} stocks tracked</p>
              </div>
              <button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-medium">
                + Add
              </button>
            </div>

            {/* Stock List */}
            <div className="space-y-2">
              {watchlistData.map((stock, i) => {
                const bullish = stock.change >= 0;
                return (
                  <motion.button
                    key={stock.ticker}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(stock)}
                    className="w-full bg-card rounded-xl p-3 border border-border/50 hover:border-border transition-all flex items-center gap-3"
                  >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WatchlistPage;
