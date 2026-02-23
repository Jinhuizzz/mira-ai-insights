import { useState } from "react";
import { Zap, Brain, FileText, BarChart3, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NowPage from "./pages/NowPage";
import AskMiraPage from "./pages/AskMiraPage";
import ResearchPage from "./pages/ResearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import FinBot from "./components/FinBot";
import AppSidebar from "./components/AppSidebar";

const tabs = [
  { id: "now", label: "Now", icon: Zap },
  { id: "mira", label: "Mira", icon: Brain },
  { id: "research", label: "Research", icon: FileText },
  { id: "watchlist", label: "Watchlist", icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface NewsContext {
  title: string;
  summary: string;
  ticker: string;
  question: string;
}

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>("now");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [credits, setCredits] = useState(20);
  const [newsContext, setNewsContext] = useState<NewsContext | null>(null);

  const consumeCredits = (amount: number) => {
    setCredits((prev) => Math.max(0, prev - amount));
  };

  const handleAskMiraFromNow = (context: NewsContext) => {
    setNewsContext(context);
    setActiveTab("mira");
  };

  const renderPage = () => {
    switch (activeTab) {
      case "now": return <NowPage onAskMira={handleAskMiraFromNow} />;
      case "mira": return <AskMiraPage credits={credits} onConsumeCredits={consumeCredits} newsContext={newsContext} onClearContext={() => setNewsContext(null)} onBack={newsContext ? () => setActiveTab("now") : undefined} />;
      case "research": return <ResearchPage credits={credits} onConsumeCredits={consumeCredits} />;
      case "watchlist": return <WatchlistPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 glass sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <h1 className="text-lg font-bold tracking-tight">
          <span className="gradient-holographic-text">Watch</span>
          <span className="text-foreground">Wise</span>
        </h1>
        <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground bg-secondary rounded-full px-2.5 py-1">
          <span className="text-accent font-semibold">{credits}</span>
          <span>cr</span>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating FinBot */}
      <FinBot credits={credits} onConsumeCredits={consumeCredits} />

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
        <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? tab.id === "mira"
                      ? "text-accent"
                      : "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`relative ${isActive && tab.id === "mira" ? "animate-pulse-glow rounded-full" : ""}`}>
                  <Icon className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform`} />
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute -bottom-0 h-0.5 w-8 rounded-full ${tab.id === "mira" ? "gradient-holographic" : "bg-primary"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} credits={credits} />
    </div>
  );
};

export default App;
