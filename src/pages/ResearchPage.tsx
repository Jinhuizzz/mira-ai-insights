import { useState } from "react";
import { ChevronRight, ExternalLink, Search, ArrowLeft, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

interface ResearchPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
  onSubPageChange?: (isSubPage: boolean) => void;
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

const sectors = ["Technology", "Healthcare", "Finance", "Energy", "Consumer", "Industrial"];

const datePeriods = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

/* ─── Browse Reports Screen ─── */
const BrowseReportsScreen = ({ onBack }: { onBack: () => void }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("All time");
  const [earningsAlert, setEarningsAlert] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const toggleSector = (s: string) =>
    setSelectedSectors((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      className="px-4 py-4"
    >
      {/* Back header */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="text-lg font-bold mb-4">Browse Reports</h2>

      {/* Date Period */}
      <div className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Date Period</div>
        <div className="flex flex-wrap gap-2">
          {datePeriods.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                selectedPeriod === p
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/60 text-muted-foreground border-border/50 hover:border-border"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Report Type */}
      <div className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Report Type</div>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <Checkbox checked={earningsAlert} onCheckedChange={(v) => setEarningsAlert(!!v)} />
          <span className="text-sm font-medium">Earnings Alert</span>
        </label>
      </div>

      {/* Sector */}
      <div className="mb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Sector</div>
        <div className="flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => toggleSector(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                selectedSectors.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/60 text-muted-foreground border-border/50 hover:border-border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Placeholder results */}
      <div className="text-xs text-muted-foreground text-center py-8">Select filters to browse reports</div>
    </motion.div>
  );
};

/* ─── Research Home ─── */
const ResearchPage = ({ credits, onConsumeCredits, onSubPageChange }: ResearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBrowse, setShowBrowse] = useState(false);
  const [activeSection, setActiveSection] = useState<"focus" | "recent">("focus");

  return (
    <AnimatePresence mode="wait">
      {showBrowse ? (
        <BrowseReportsScreen key="browse" onBack={() => { setShowBrowse(false); onSubPageChange?.(false); }} />
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.15 }}
          className="px-4 py-4"
        >
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
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-lg font-bold leading-snug flex-1">
              Wall-Street Grade research, in seconds.
            </h2>
            <button
              onClick={() => { setShowBrowse(true); onSubPageChange?.(true); }}
              className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground whitespace-nowrap"
            >
              Browse
            </button>
          </div>

          <Separator className="mb-5" />

          {/* Latest Report */}
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

          {/* Swipeable Tabs: In Focus / Recent Updates */}
          <div className="mb-6">
            <div className="flex gap-1 bg-secondary/60 rounded-lg p-1 mb-3">
              {(["focus", "recent"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`relative flex-1 text-xs font-semibold py-1.5 rounded-md transition-all ${
                    activeSection === tab ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {activeSection === tab && (
                    <motion.div
                      layoutId="researchTab"
                      className="absolute inset-0 bg-card rounded-md border border-border/50 shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab === "focus" ? "In Focus" : "Recent Updates"}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeSection === "focus" ? (
                <motion.div
                  key="focus"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-2"
                >
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
                </motion.div>
              ) : (
                <motion.div
                  key="recent"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col gap-2"
                >
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResearchPage;
