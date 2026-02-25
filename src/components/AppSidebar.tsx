import { useState, useCallback } from "react";
import { X, Globe, Mail, CircleDollarSign, ChevronRight, ArrowLeft, Camera, Pencil, LogOut, Gift, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
  credits: number;
}

const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "es", label: "Español" },
];

const randomUsername = "User_" + Math.random().toString(36).substring(2, 8);

type SidebarView = "main" | "profile" | "credits" | "language";

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
  </svg>
);

const socialLinks = [
  { label: "X", url: "#", icon: XIcon },
  { label: "Instagram", url: "#", icon: InstagramIcon },
  { label: "Discord", url: "#", icon: DiscordIcon },
];

const AppSidebar = ({ open, onClose, credits }: AppSidebarProps) => {
  const [view, setView] = useState<SidebarView>("main");
  const [username, setUsername] = useState(randomUsername);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(username);
  const [selectedLang, setSelectedLang] = useState("en");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const inviteCode = "Z8X9C-2";

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [inviteCode]);

  const handleClose = () => {
    setView("main");
    onClose();
  };

  return (
    <>
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
                {view === "profile" ? "Edit Profile" : view === "credits" ? "Credit Details" : view === "language" ? "Language" : "Settings"}
              </h2>
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 py-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                {view === "main" && (
                  <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* User Profile */}
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

                    {/* Credit + Invite Card */}
                    <div className="px-4 pb-4">
                      <div className="rounded-2xl bg-secondary overflow-hidden">
                        <button
                          onClick={() => setView("credits")}
                          className="w-full p-4 hover:bg-secondary/80 transition-all text-left group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CircleDollarSign className="w-4 h-4 text-amber-400" />
                              <span className="text-sm font-semibold">Credit</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-lg font-bold">{credits}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                            </div>
                          </div>
                        </button>
                        <div className="h-px bg-border/30 mx-4" />
                        <button
                          onClick={() => setShowInviteModal(true)}
                          className="w-full p-4 hover:bg-secondary/80 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <Gift className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold">Invite & Earn</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Invite friends with your referral code. You'll both get <span className="font-semibold text-foreground">500 points</span>.
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* General */}
                    <div className="px-4 pt-2 pb-2">
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">General</div>
                    </div>
                    <button
                      onClick={() => setView("language")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/50 transition-colors text-left"
                    >
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Language</span>
                    </button>
                    <button
                      onClick={() => window.open("mailto:marketing@watchwise.ai", "_blank")}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/50 transition-colors text-left"
                    >
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Help Center</span>
                    </button>

                    {/* Connect */}
                    <div className="px-4 pt-6 pb-2">
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Connect</div>
                    </div>
                    {socialLinks.map((link) => {
                      const SocialIcon = link.icon;
                      return (
                        <a
                          key={link.label}
                          href={link.url}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary/50 transition-colors"
                        >
                          <SocialIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{link.label}</span>
                        </a>
                      );
                    })}
                  </motion.div>
                )}

                {view === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-4">
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
                    <div className="rounded-xl border border-border/50 bg-secondary/30 p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Remaining Credits</div>
                      <div className="text-3xl font-bold text-primary">{credits}</div>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-secondary/30 p-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Daily Refresh Credits</span>
                      <span className="text-sm font-semibold">500</span>
                    </div>
                  </motion.div>
                )}

                {view === "language" && (
                  <motion.div key="language" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLang(lang.code)}
                        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors text-left ${selectedLang === lang.code ? "bg-secondary/30" : ""}`}
                      >
                        <span className="text-sm">{lang.label}</span>
                        {selectedLang === lang.code && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Log Out */}
            {view === "main" && (
              <div className="p-4 border-t border-border/50">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors text-left text-muted-foreground hover:text-destructive">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Log Out</span>
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>

      {/* Invite Code Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-[60]"
              onClick={() => { setShowInviteModal(false); setCopied(false); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 pointer-events-none"
            >
              <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-xl pointer-events-auto relative">
                <button
                  onClick={() => { setShowInviteModal(false); setCopied(false); }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">Your Invitation Code</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Share this code with your friends. You'll both get 500 points.
                  </p>
                </div>

                <div className="bg-secondary/60 border border-border/50 rounded-xl px-4 py-3.5 text-center mb-5">
                  <span className="text-2xl font-bold font-mono tracking-widest">{inviteCode}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowInviteModal(false); setCopied(false); }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-secondary/50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
