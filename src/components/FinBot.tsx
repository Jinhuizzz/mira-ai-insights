import { useState } from "react";
import { MessageCircle, X, Send, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FinBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full gradient-holographic flex items-center justify-center animate-pulse-glow shadow-lg transition-transform hover:scale-110"
      >
        {open ? <X className="w-5 h-5 text-primary-foreground" /> : <MessageCircle className="w-5 h-5 text-primary-foreground" />}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-36 right-4 left-4 z-40 max-w-sm ml-auto bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="gradient-holographic p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                <span className="text-sm font-semibold text-primary-foreground">FinBot — Fast Response AI</span>
              </div>
            </div>

            <div className="h-48 p-4 overflow-y-auto">
              <div className="bg-secondary rounded-xl px-3 py-2 text-sm max-w-[80%]">
                Hi! I'm FinBot. Ask me anything about the markets — I'll respond instantly. ⚡
              </div>
            </div>

            <div className="p-3 border-t border-border/50 flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask FinBot..."
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
              <button className="p-2 text-primary hover:text-primary/80 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FinBot;
