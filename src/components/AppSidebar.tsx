import { X, Settings, CreditCard, Share2, Info, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Settings, label: "Settings", desc: "Account & notifications" },
  { icon: CreditCard, label: "Subscription", desc: "Manage your plan" },
  { icon: Share2, label: "Social Media", desc: "Follow us everywhere" },
  { icon: Info, label: "About", desc: "Version 1.0.0" },
];

const socialLinks = [
  { label: "Substack", url: "#" },
  { label: "Twitter / X", url: "#" },
  { label: "Discord", url: "#" },
];

const AppSidebar = ({ open, onClose }: AppSidebarProps) => {
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
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h2 className="text-lg font-bold">
                <span className="gradient-holographic-text">Mira</span> Finance
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 py-4">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </button>
              ))}

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

            <div className="p-4 border-t border-border/50">
              <div className="gradient-holographic rounded-lg p-3 text-center">
                <div className="text-sm font-semibold text-primary-foreground">Upgrade to Pro</div>
                <div className="text-xs text-primary-foreground/70 mt-1">Unlock all features</div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppSidebar;
