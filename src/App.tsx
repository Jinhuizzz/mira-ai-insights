import { useState } from "react";
import watchwiseLogo from "./assets/watchwise-logo-full.png";
import { Bell, FileText, BarChart3, Menu, History, Bot, Bookmark, Plus } from "lucide-react";
import MiraBrainIcon from "./components/MiraBrainIcon";
import { motion, AnimatePresence } from "framer-motion";
import NowPage from "./pages/NowPage";
import AskMiraPage from "./pages/AskMiraPage";
import ResearchPage from "./pages/ResearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import FinBot from "./components/FinBot";
import AppSidebar from "./components/AppSidebar";

const tabs = [
  { id: "now", label: "Now", icon: Bell },
  { id: "mira", label: "Mira", icon: MiraBrainIcon },
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
  const [nowCardIndex, setNowCardIndex] = useState(0);
  const [miraSessionKey, setMiraSessionKey] = useState(0);
  const [isSubPage, setIsSubPage] = useState(false);
  const [showSavedReports, setShowSavedReports] = useState(false);
  const [showReadingHistory, setShowReadingHistory] = useState(false);
  const [showMiraHistory, setShowMiraHistory] = useState(false);
  const [showAddStock, setShowAddStock] = useState(false);

  const consumeCredits = (amount: number) => {
    setCredits((prev) => Math.max(0, prev - amount));
  };

  const handleAskMiraFromNow = (context: NewsContext) => {
    setNewsContext(context);
    setMiraSessionKey((k) => k + 1); // force new Mira session
    setActiveTab("mira");
  };

  const renderPage = () => {
    switch (activeTab) {
      case "now": return <NowPage onAskMira={handleAskMiraFromNow} currentIndex={nowCardIndex} setCurrentIndex={setNowCardIndex} onSubPageChange={setIsSubPage} />;
      case "mira": return <AskMiraPage key={miraSessionKey} credits={credits} onConsumeCredits={consumeCredits} newsContext={newsContext} onClearContext={() => setNewsContext(null)} onBack={newsContext ? () => setActiveTab("now") : undefined} onSubPageChange={setIsSubPage} showHistory={showMiraHistory} onCloseHistory={() => setShowMiraHistory(false)} />;
      case "research": return <ResearchPage credits={credits} onConsumeCredits={consumeCredits} onSubPageChange={setIsSubPage} showSavedReports={showSavedReports} onCloseSavedReports={() => setShowSavedReports(false)} showReadingHistory={showReadingHistory} onCloseReadingHistory={() => setShowReadingHistory(false)} />;
      case "watchlist": return <WatchlistPage onSubPageChange={setIsSubPage} showAddStock={showAddStock} onCloseAddStock={() => setShowAddStock(false)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Header */}
      {!isSubPage && (
      <header className="flex items-center justify-between px-4 py-3 border-b border-border/50 glass sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <h1 className="text-lg font-bold tracking-tight">
          {activeTab === "mira" ? (
            <span className="gradient-holographic-text">MIRA</span>
          ) : activeTab === "research" ? (
            <span className="gradient-holographic-text">Research</span>
          ) : activeTab === "watchlist" ? (
            <span className="gradient-holographic-text">Watchlist</span>
          ) : (
            <img src={watchwiseLogo} alt="WatchWise.ai" className="h-5 object-contain" />
          )}
        </h1>
        <div className="flex items-center gap-2">
          {activeTab === "mira" ? (
            <button onClick={() => setShowMiraHistory(true)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <History className="w-5 h-5 text-muted-foreground" />
            </button>
          ) : activeTab === "research" ? (
            <>
              <button
                onClick={() => setShowReadingHistory(true)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <History className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setShowSavedReports(true)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Bookmark className="w-5 h-5 text-muted-foreground" />
              </button>
            </>
          ) : activeTab === "watchlist" ? (
            <button onClick={() => setShowAddStock(true)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </button>
          ) : (
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Bot className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>
      )}

      {/* Page Content */}
      <main className={`flex-1 overflow-y-auto ${isSubPage ? 'pb-4' : 'pb-20'}`}>
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

      {/* Floating FinBot - temporarily disabled */}
      {/* <FinBot credits={credits} onConsumeCredits={consumeCredits} /> */}

      {/* Bottom Tab Bar */}
      {!isSubPage && (
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
        <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === "mira" && activeTab !== "mira") {
                    setNewsContext(null);
                    setMiraSessionKey((k) => k + 1);
                  }
                  setIsSubPage(false);
                  setActiveTab(tab.id);
                }}
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
      )}

      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} credits={credits} />
    </div>
  );
};

export default App;
