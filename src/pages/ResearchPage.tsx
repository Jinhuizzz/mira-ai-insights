import { useState } from "react";
import { ChevronRight, ExternalLink, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResearchPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
}

const latestReports = [
  { id: 1, title: "NVIDIA: The AI Infrastructure Kingpin", ticker: "NVDA", date: "Feb 20", readTime: "5 min read", creditCost: 2, color: "from-accent/20 to-primary/5" },
  { id: 2, title: "Apple's Services Flywheel Accelerates", ticker: "AAPL", date: "Feb 19", readTime: "3 min read", creditCost: 2, color: "from-primary/20 to-accent/5" },
  { id: 3, title: "Tesla at a Valuation Crossroads", ticker: "TSLA", date: "Feb 18", readTime: "4 min read", creditCost: 2, color: "from-destructive/15 to-accent/5" },
];

const focusTags = ["AI Boom", "EV War", "Rate Cut", "Earnings", "China"];

const sectors = [
  { icon: "💻", label: "Technology" },
  { icon: "🏥", label: "Healthcare" },
  { icon: "🏦", label: "Finance" },
  { icon: "⚡", label: "Energy" },
  { icon: "🛍️", label: "Consumer" },
  { icon: "🏭", label: "Industrial" },
];

const ResearchPage = ({ credits, onConsumeCredits }: ResearchPageProps) => {
  const [activeFilter, setActiveFilter] = useState<"focus" | "recent">("focus");
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);

  const handleUnlock = (report: typeof latestReports[0]) => {
    if (unlockedIds.includes(report.id)) return;
    if (credits >= report.creditCost) {
      onConsumeCredits(report.creditCost);
      setUnlockedIds((prev) => [...prev, report.id]);
    }
  };

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold">Research</h2>
        <p className="text-sm text-muted-foreground">Deep Research, Done in Seconds.</p>
      </div>

      {/* Latest Reports - Large Carousel */}
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Latest Reports</div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2 snap-x snap-mandatory">
          {latestReports.map((report, i) => {
            const unlocked = unlockedIds.includes(report.id);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex-shrink-0 w-[85vw] max-w-[340px] snap-center bg-gradient-to-br ${report.color} bg-card border border-border/50 rounded-xl p-5 cursor-pointer hover:border-border transition-all relative overflow-hidden`}
                onClick={() => handleUnlock(report)}
              >
                <div className="text-xs font-mono font-semibold text-primary mb-2">{report.ticker}</div>
                <h3 className="text-base font-semibold leading-tight mb-2">{report.title}</h3>
                <div className="text-xs text-muted-foreground mb-4">{report.readTime}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{report.date}</span>
                  {unlocked ? (
                    <span className="text-xs text-bullish font-medium">Unlocked ✓</span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium bg-accent/20 text-accent px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" />
                      Unlock for {report.creditCost} Credits
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveFilter("focus")}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            activeFilter === "focus" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          In Focus
        </button>
        <button
          onClick={() => setActiveFilter("recent")}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            activeFilter === "recent" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          Recent Updates
        </button>
      </div>

      {/* Focus Tags */}
      <AnimatePresence mode="wait">
        {activeFilter === "focus" && (
          <motion.div
            key="focus"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-1.5 mb-5"
          >
            {focusTags.map((tag) => (
              <button key={tag} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors">
                {tag}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
