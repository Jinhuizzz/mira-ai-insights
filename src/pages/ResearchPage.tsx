import { useState, useEffect } from "react";
import { ChevronRight, ExternalLink, Search, ArrowLeft, Calendar, X, Bookmark, BookOpen, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

interface ResearchPageProps {
  credits: number;
  onConsumeCredits: (amount: number) => void;
  onSubPageChange?: (isSubPage: boolean) => void;
  showSavedReports?: boolean;
  onCloseSavedReports?: () => void;
  showReadingHistory?: boolean;
  onCloseReadingHistory?: () => void;
}

const latestReport = {
  id: 1,
  title: "NVIDIA: The AI Infrastructure Kingpin",
  ticker: "NVDA",
  date: "Feb 20",
  readTime: "5 min read",
  color: "from-accent/20 to-primary/5",
  tags: ["Earnings Alert", "NEUTRAL"],
  summary: "NVIDIA continues to dominate the AI chip market with record datacenter revenue and expanding margins.",
  image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=300&fit=crop",
};

const continueReading = [
  {
    id: 1,
    title: "Tesla at a Valuation Crossroads",
    ticker: "TSLA",
    progress: 45,
    currentPage: 10,
    totalPages: 30,
    image: "https://images.unsplash.com/photo-1617886903355-9354c0e4cadc?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Apple's Services Flywheel Accelerates",
    ticker: "AAPL",
    progress: 72,
    currentPage: 18,
    totalPages: 25,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&h=200&fit=crop",
  },
];

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

const readingHistory = [
  { id: 1, title: "Meta's Advertising Engine Roars", ticker: "META", date: "Feb 15", readTime: "5 min" },
  { id: 2, title: "Amazon's AWS Growth Trajectory", ticker: "AMZN", date: "Feb 12", readTime: "7 min" },
  { id: 3, title: "Google's Search Dominance Under Threat?", ticker: "GOOGL", date: "Feb 10", readTime: "6 min" },
  { id: 4, title: "Netflix Subscriber Surge Analysis", ticker: "NFLX", date: "Feb 8", readTime: "4 min" },
];

const datePeriods = ["Last 7 days", "Last 30 days", "Last 90 days", "All time"];

const savedReports = [
  { id: 1, title: "NVIDIA: The AI Infrastructure Kingpin", ticker: "NVDA", date: "Feb 20", readTime: "5 min" },
  { id: 2, title: "Apple's Services Flywheel Accelerates", ticker: "AAPL", date: "Feb 19", readTime: "7 min" },
  { id: 3, title: "Tesla at a Valuation Crossroads", ticker: "TSLA", date: "Feb 18", readTime: "6 min" },
  { id: 4, title: "Microsoft Cloud Momentum Continues", ticker: "MSFT", date: "Feb 17", readTime: "5 min" },
];

/* ─── Saved Reports Screen ─── */
const SavedReportsScreen = ({ onBack }: { onBack: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 40 }}
    transition={{ duration: 0.2 }}
    className="px-4 py-4"
  >
    <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors">
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
    <h2 className="text-lg font-bold mb-1">Saved Reports</h2>
    <p className="text-xs text-muted-foreground mb-4">Your bookmarked reports</p>
    <div className="flex flex-col gap-2">
      {savedReports.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-border transition-all"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono font-semibold text-primary">{item.ticker}</span>
              <span className="text-[10px] text-muted-foreground">{item.readTime}</span>
            </div>
            <span className="text-sm font-medium truncate block">{item.title}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <span className="text-xs text-muted-foreground">{item.date}</span>
            <Bookmark className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ─── Reading History Screen ─── */
const ReadingHistoryScreen = ({ onBack }: { onBack: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 40 }}
    transition={{ duration: 0.2 }}
    className="px-4 py-4"
  >
    <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground mb-5 hover:text-foreground transition-colors">
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
    <h2 className="text-lg font-bold mb-4">Reading History</h2>
    <div className="flex flex-col gap-2">
      {readingHistory.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="bg-card border border-border/50 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-border transition-all"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono font-semibold text-primary">{item.ticker}</span>
              <span className="text-[10px] text-muted-foreground">{item.readTime}</span>
            </div>
            <span className="text-sm font-medium truncate block">{item.title}</span>
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{item.date}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ─── Browse Reports Screen ─── */
const BrowseReportsScreen = ({ onBack }: { onBack: () => void }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("All time");
  const [earningsAlert, setEarningsAlert] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

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
      {/* Header with back + search */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all"
        >
          {showSearch ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
        </button>
      </div>

      {/* Search input (collapsible) */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-secondary/60 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <div className="text-xs text-muted-foreground text-center py-8">Select filters to browse reports</div>
    </motion.div>
  );
};

/* ─── Research Home ─── */
const ResearchPage = ({ credits, onConsumeCredits, onSubPageChange, showSavedReports, onCloseSavedReports, showReadingHistory, onCloseReadingHistory }: ResearchPageProps) => {
  const [showBrowse, setShowBrowse] = useState(false);
  const [activeSection, setActiveSection] = useState<"focus" | "recent">("focus");

  useEffect(() => {
    if (showSavedReports || showReadingHistory) {
      onSubPageChange?.(true);
    }
  }, [showSavedReports, showReadingHistory]);

  return (
    <AnimatePresence mode="wait">
      {showSavedReports ? (
        <SavedReportsScreen key="saved" onBack={() => { onCloseSavedReports?.(); onSubPageChange?.(false); }} />
      ) : showReadingHistory ? (
        <ReadingHistoryScreen key="history" onBack={() => { onCloseReadingHistory?.(); onSubPageChange?.(false); }} />
      ) : showBrowse ? (
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
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-5">
            <h2 className="text-base font-bold leading-tight min-w-0">
              Wall-Street Grade research,<br />in seconds.
            </h2>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <a
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-semibold px-2 py-1.5 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 border border-border/50 transition-colors whitespace-nowrap text-center"
              >
                Subscribe our Substack
              </a>
              <button
                onClick={() => { setShowBrowse(true); onSubPageChange?.(true); }}
                className="text-[9px] font-semibold px-2 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Browse all reports
              </button>
            </div>
          </div>

          <Separator className="mb-5" />

          {/* Latest Report */}
          <div className="mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Latest Report</div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-border transition-all"
            >
              <div className="flex">
                {/* Left: Company Image */}
                <div className="w-28 flex-shrink-0">
                  <img
                    src={latestReport.image}
                    alt={latestReport.ticker}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Right: Info */}
                <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      {latestReport.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                            tag === "Earnings Alert"
                              ? "bg-accent/15 text-accent"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold leading-tight mb-1">{latestReport.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{latestReport.summary}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2.5">
                    <span className="text-[10px] text-muted-foreground">{latestReport.date}</span>
                    <div className="flex items-center gap-2">
                      <button className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-primary text-primary-foreground">
                        Start Reading
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Continue Reading */}
          {continueReading.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Continue Reading</div>
              <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
                {continueReading.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border/50 rounded-xl overflow-hidden cursor-pointer hover:border-border transition-all flex-shrink-0 w-40"
                  >
                    <div className="p-2.5">
                      <img src={item.image} alt={item.ticker} className="w-8 h-8 rounded-md object-cover mb-2" />
                      <span className="text-[10px] font-mono font-semibold text-primary">{item.ticker}</span>
                      <p className="text-[11px] font-medium truncate mt-0.5">{item.title}</p>
                      <div className="mt-2">
                        <Progress value={item.progress} className="h-1 bg-secondary" />
                        <span className="text-[9px] text-muted-foreground mt-0.5 block">
                          {item.progress}% · p.{item.currentPage}/{item.totalPages}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}


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
