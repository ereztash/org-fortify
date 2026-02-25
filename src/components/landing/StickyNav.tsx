import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, BarChart3, BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/972524545963?text=היי%20ארז%2C%20אשמח%20לשיחת%20אבחון%20ראשונית";

const navLinks = [
  { label: "תהליך", id: "how-it-works" },
  { label: "מחשבון", id: "roi-engine" },
  { label: "שאלות", id: "faq-section" },
];

export function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/10"
        >
          <div className="container max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold font-display text-foreground">
              ארז טל שיר
            </span>

            <div className="hidden sm:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
                >
                  {link.label}
                </button>
              ))}
              <div className="w-px h-5 bg-border/30 mx-2" />
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="gap-1.5 text-xs">
                <BarChart3 className="h-3.5 w-3.5" />
                דשבורד
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" asChild className="gap-2 text-xs shadow-sm shadow-primary/20">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">דבר איתי</span>
                </a>
              </Button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="sm:hidden text-muted-foreground hover:text-primary transition-colors p-1"
                aria-label="תפריט"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="sm:hidden border-t border-border/10 overflow-hidden"
              >
                <div className="flex flex-col gap-1 p-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollTo(link.id)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2.5 rounded-lg hover:bg-primary/5 text-right"
                    >
                      {link.label}
                    </button>
                  ))}
                  <Button variant="ghost" size="sm" onClick={() => { navigate("/dashboard"); setMobileOpen(false); }} className="gap-1.5 text-xs justify-start">
                    <BarChart3 className="h-3.5 w-3.5" />
                    דשבורד
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
