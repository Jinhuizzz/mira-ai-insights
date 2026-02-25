import { X, Globe, Trash2, HelpCircle, ExternalLink, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  credits: number;
}

const generalItems = [
  { icon: Globe, label: "Language" },
  { icon: Trash2, label: "Clear Cache" },
  { icon: HelpCircle, label: "Help Center" },
];

const socialLinks = [
  { label: "X", url: "#" },
  { label: "Instagram", url: "#" },
  { label: "Discord", url: "#" },
];

const randomUsername = "User_" + Math.random().toString(36).substring(2, 8);

const AppSidebar = ({ open, onClose, credits }: AppSidebarProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h2 className="text-lg font-bold">
                <span className="gradient-holographic-text">Watch</span>Wise
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 py-4 overflow-y-auto">
              {/* User Profile */}
              <div className="px-4 pb-4 flex items-center gap-3">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                    {randomUsername.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{randomUsername}</div>
                  <div className="text-xs text-muted-foreground truncate">{randomUsername.toLowerCase()}@watchwise.ai</div>
                </div>
              </div>

              {/* Points Card */}
              <div className="px-4 pb-4">
                <div className="rounded-xl border border-border/50 bg-secondary/30 p-3 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
                    <Coins className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Points Balance</div>
                    <div className="text-lg font-bold leading-tight">{credits}</div>
                  </div>
                </div>
              </div>

              {/* General */}
              <div className="px-4 pt-2 pb-2">
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">General</div>
              </div>
              {generalItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/50 transition-colors text-left"
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}

              {/* Connect */}
              <div className="px-4 pt-6 pb-2">
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Connect</div>
              </div>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppSidebar;
