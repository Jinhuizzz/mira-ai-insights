import { ChevronRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const latestReports = [
  { id: 1, title: "NVIDIA: AI Infrastructure Play", ticker: "NVDA", date: "Feb 20", color: "from-emerald-500/20 to-emerald-500/5" },
  { id: 2, title: "Apple's Services Dominance", ticker: "AAPL", date: "Feb 19", color: "from-blue-500/20 to-blue-500/5" },
  { id: 3, title: "Tesla's Valuation Crossroads", ticker: "TSLA", date: "Feb 18", color: "from-red-500/20 to-red-500/5" },
];

const sectors = [
  { icon: "💻", label: "Technology" },
  { icon: "🏥", label: "Healthcare" },
  { icon: "🏦", label: "Finance" },
  { icon: "⚡", label: "Energy" },
  { icon: "🛍️", label: "Consumer" },
  { icon: "🏭", label: "Industrial" },
];

const filters = ["In Focus", "Recent Updates"];

const ResearchPage = () => {
  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">Research</h2>
        <p className="text-sm text-muted-foreground">Structured deep-dive investment analysis</p>
      </div>

      {/* Latest Reports - Horizontal Scroll */}
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Latest Reports</div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
          {latestReports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex-shrink-0 w-56 bg-gradient-to-br ${report.color} bg-card border border-border/50 rounded-xl p-4 cursor-pointer hover:border-border transition-all`}
            >
              <div className="text-xs font-mono font-semibold text-primary mb-2">{report.ticker}</div>
              <h3 className="text-sm font-semibold leading-tight mb-3">{report.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{report.date}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {filters.map((f, i) => (
          <button
            key={f}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Browse by Sector */}
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Browse by Sector</div>
        <div className="grid grid-cols-3 gap-2">
          {sectors.map((sector) => (
            <button
              key={sector.label}
              className="bg-card border border-border/50 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-border hover:bg-secondary/30 transition-all"
            >
              <span className="text-2xl">{sector.icon}</span>
              <span className="text-xs font-medium">{sector.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* View All Reports */}
      <button className="w-full bg-secondary hover:bg-secondary/80 rounded-xl py-3 text-sm font-medium transition-colors mb-6">
        View All Reports
      </button>

      {/* Substack CTA */}
      <div className="bg-card border border-border/50 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-holographic flex items-center justify-center flex-shrink-0">
            <ExternalLink className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">Subscribe to our Substack</div>
            <div className="text-xs text-muted-foreground">Exclusive insights delivered weekly</div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default ResearchPage;
