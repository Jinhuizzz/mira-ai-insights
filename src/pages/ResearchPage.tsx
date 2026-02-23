import { useState } from "react";
import { ChevronRight, ExternalLink, Search } from "lucide-react";
import { motion } from "framer-motion";

interface ResearchPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
}

const latestReport = {
  id: 1,
  title: "NVIDIA: The AI Infrastructure Kingpin",
  ticker: "NVDA",
  date: "Feb 20",
  readTime: "5 min read",
  color: "from-accent/20 to-primary/5",
};

const inFocusItems = [
  { id: 1, title: "AI Boom: Who Wins the Next Wave?", tag: "AI", date: "Feb 20" },
  { id: 2, title: "EV War Heats Up in China", tag: "EV", date: "Feb 19" },
  { id: 3, title: "Rate Cuts: What It Means for Tech", tag: "Macro", date: "Feb 18" },
];

const recentUpdates = [
  { id: 1, title: "Apple's Services Flywheel Accelerates", ticker: "AAPL", date: "Feb 19" },
  { id: 2, title: "Tesla at a Valuation Crossroads", ticker: "TSLA", date: "Feb 18" },
  { id: 3, title: "Microsoft Cloud Momentum Continues", ticker: "MSFT", date: "Feb 17" },
];

const ResearchPage = ({ credits, onConsumeCredits }: ResearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-4 py-4">
      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search companies, sectors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <h2 className="text-lg font-bold leading-snug flex-1">
          Wall-Street Grade research, done in seconds.
        </h2>
        <button className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground whitespace-nowrap">
          Browse all reports
        </button>
      </div>

      {/* Latest Report - Single Card */}
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Latest Report</div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-br ${latestReport.color} bg-card border border-border/50 rounded-xl p-5 cursor-pointer hover:border-border transition-all`}
        >
          <div className="text-xs font-mono font-semibold text-primary mb-2">{latestReport.ticker}</div>
          <h3 className="text-base font-semibold leading-tight mb-2">{latestReport.title}</h3>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{latestReport.readTime}</span>
            <span className="text-xs text-muted-foreground">{latestReport.date}</span>
          </div>
        </motion.div>
      </div>

      {/* In Focus */}
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">In Focus</div>
        <div className="flex flex-col gap-2">
          {inFocusItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-border transition-all"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-accent/15 text-accent">{item.tag}</span>
                <span className="text-sm font-medium truncate">{item.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent Updates</div>
        <div className="flex flex-col gap-2">
          {recentUpdates.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-border transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono font-semibold text-primary mb-0.5">{item.ticker}</div>
                <span className="text-sm font-medium truncate block">{item.title}</span>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </div>

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
