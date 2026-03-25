import { useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export type ScrollMilestone = 10 | 25 | 50 | 75 | 90 | 100;

export interface ScrollEvent {
  milestone: ScrollMilestone;
  ts: number;
  sessionId: string;
  path: string;
}

export interface SectionEvent {
  section: string;
  ts: number;
  sessionId: string;
}

// ── Session ID (stable per tab) ────────────────────────────────────────────────
const SESSION_ID = (() => {
  try {
    const k = "cor-sys-sid";
    const stored = sessionStorage.getItem(k);
    if (stored) return stored;
    const id = Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem(k, id);
    return id;
  } catch {
    return Math.random().toString(36).slice(2, 10);
  }
})();

const MILESTONES: ScrollMilestone[] = [10, 25, 50, 75, 90, 100];
const STORAGE_KEY_SCROLL = "cor-sys-scroll";
const STORAGE_KEY_SECTIONS = "cor-sys-sections";
const MAX_EVENTS = 100;

// ── Storage helper ────────────────────────────────────────────────────────────
function storeEvent<T>(key: string, event: T) {
  try {
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as T[];
    existing.push(event);
    localStorage.setItem(key, JSON.stringify(existing.slice(-MAX_EVENTS)));
  } catch { /* ignore */ }
}

// ── Scroll Depth Hook ─────────────────────────────────────────────────────────
export function useScrollDepth() {
  const reached = useRef<Set<ScrollMilestone>>(new Set());

  useEffect(() => {
    const track = (milestone: ScrollMilestone) => {
      if (reached.current.has(milestone)) return;
      reached.current.add(milestone);

      const event: ScrollEvent = {
        milestone,
        ts: Date.now(),
        sessionId: SESSION_ID,
        path: window.location.pathname,
      };

      storeEvent(STORAGE_KEY_SCROLL, event);

      // Pluggable: fire custom DOM event — any analytics provider can listen
      window.dispatchEvent(new CustomEvent("cor:scroll-depth", { detail: event }));

      if (import.meta.env.DEV) {
        console.log(`[ScrollDepth] %c${milestone}%`, "color: hsl(160 84% 50%); font-weight: bold;", event);
      }
    };

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((window.scrollY / docHeight) * 100);
      for (const m of MILESTONES) {
        if (pct >= m) track(m);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // fire immediately for already-scrolled state
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// ── Section Visibility Hook ───────────────────────────────────────────────────
export function useSectionVisibility(
  sectionId: string,
  label: string,
  threshold = 0.35
) {
  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    let fired = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;

          const event: SectionEvent = {
            section: label,
            ts: Date.now(),
            sessionId: SESSION_ID,
          };

          storeEvent(STORAGE_KEY_SECTIONS, event);
          window.dispatchEvent(new CustomEvent("cor:section-visible", { detail: event }));

          if (import.meta.env.DEV) {
            console.log(`[Section] %c${label}`, "color: hsl(38 92% 50%); font-weight: bold;", event);
          }

          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, label, threshold]);
}

// ── Analytics Reader (debug / dashboard use) ─────────────────────────────────
export function readScrollAnalytics(): {
  scroll: ScrollEvent[];
  sections: SectionEvent[];
} {
  try {
    return {
      scroll: JSON.parse(localStorage.getItem(STORAGE_KEY_SCROLL) ?? "[]"),
      sections: JSON.parse(localStorage.getItem(STORAGE_KEY_SECTIONS) ?? "[]"),
    };
  } catch {
    return { scroll: [], sections: [] };
  }
}
