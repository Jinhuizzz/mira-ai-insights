import { useState } from "react";
import { Newspaper, Brain, FileText, BarChart3, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NewsPage from "./pages/NewsPage";
import AskMiraPage from "./pages/AskMiraPage";
import ResearchPage from "./pages/ResearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import FinBot from "./components/FinBot";
import AppSidebar from "./components/AppSidebar";

const tabs = [
  { id: "news", label: "News", icon: Newspaper },
  { id: "mira", label: "Ask Mira", icon: Brain },
  { id: "research", label: "Research", icon: FileText },
  { id: "watchlist", label: "Watchlist", icon: BarChart3 },
] as const;

type TabId = (typeof tabs)[number]["id"];

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>("news");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case "news": return <NewsPage />;
      case "mira": return <AskMiraPage />;
      case "research": return <ResearchPage />;
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
          <span className="gradient-holographic-text">Mira</span>{" "}
          <span className="text-foreground">Finance</span>
        </h1>
        <div className="w-9" />
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
      <FinBot />

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
      <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
};

export default App;
