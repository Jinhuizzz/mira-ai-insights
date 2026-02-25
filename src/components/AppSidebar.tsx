import { useState } from "react";
import { X, Globe, Trash2, HelpCircle, ExternalLink, CircleDollarSign, ChevronRight, ArrowLeft, Camera, Pencil } from "lucide-react";
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

type SidebarView = "main" | "profile" | "credits";

const AppSidebar = ({ open, onClose, credits }: AppSidebarProps) => {
  const [view, setView] = useState<SidebarView>("main");
  const [username, setUsername] = useState(randomUsername);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(username);

  const handleClose = () => {
    setView("main");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={handleClose}
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
              {view !== "main" ? (
                <button onClick={() => setView("main")} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <div className="w-8" />
              )}
              <h2 className="text-sm font-semibold text-muted-foreground">
                {view === "profile" ? "Edit Profile" : view === "credits" ? "Credit Details" : "Menu"}
              </h2>
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 py-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                {view === "main" && (
                  <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* User Profile - Clickable */}
                    <button
                      onClick={() => setView("profile")}
                      className="w-full px-4 pb-4 flex items-center gap-3 hover:bg-secondary/30 transition-colors rounded-lg mx-0"
                    >
                      <Avatar className="h-11 w-11">
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold text-sm">
                          {username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 text-left flex-1">
                        <div className="text-sm font-semibold truncate">{username}</div>
                        <div className="text-xs text-muted-foreground truncate">{username.toLowerCase()}@watchwise.ai</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>

                    {/* Credit Card - Standalone */}
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => setView("credits")}
                        className="w-full rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-4 hover:from-primary/15 hover:to-primary/10 transition-all text-left shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <CircleDollarSign className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Credit</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="text-2xl font-bold">{credits}</div>
                        <div className="text-[10px] text-muted-foreground mt-1">Daily refresh: 500</div>
                      </button>
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
                  </motion.div>
                )}

                {view === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-4">
                    {/* Avatar edit */}
                    <div className="flex flex-col items-center py-6">
                      <div className="relative">
                        <Avatar className="h-20 w-20">
                          <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                            {username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-md">
                          <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Name edit */}
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Username</label>
                      {editingName ? (
                        <div className="flex gap-2">
                          <input
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            autoFocus
                          />
                          <button
                            onClick={() => { setUsername(nameInput); setEditingName(false); }}
                            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setNameInput(username); setEditingName(true); }}
                          className="w-full flex items-center justify-between bg-secondary/30 border border-border/50 rounded-lg px-3 py-2.5"
                        >
                          <span className="text-sm">{username}</span>
                          <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <label className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email</label>
                      <div className="bg-secondary/30 border border-border/50 rounded-lg px-3 py-2.5">
                        <span className="text-sm text-muted-foreground">{username.toLowerCase()}@watchwise.ai</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === "credits" && (
                  <motion.div key="credits" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-4 space-y-4">
                    {/* Remaining */}
                    <div className="rounded-xl border border-border/50 bg-secondary/30 p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Remaining Credits</div>
                      <div className="text-3xl font-bold text-primary">{credits}</div>
                    </div>

                    {/* Daily Refresh */}
                    <div className="rounded-xl border border-border/50 bg-secondary/30 p-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Refresh Credits</span>
                      <span className="text-sm font-semibold">500</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppSidebar;
