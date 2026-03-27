import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"logo" | "expand" | "done">("logo");

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase !== "done" && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo mark */}
          <motion.div
            className="relative flex flex-col items-center gap-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            onAnimationComplete={() => {
              setTimeout(() => setPhase("expand"), 800);
              setTimeout(() => setPhase("done"), 1600);
            }}
          >
            {/* Geometric logo */}
            <motion.svg
              viewBox="0 0 80 80"
              className="w-20 h-20 md:w-28 md:h-28"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring", stiffness: 60 }}
            >
              {/* Outer ring */}
              <motion.circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              {/* Inner shield / pulse */}
              <motion.circle
                cx="40" cy="40" r="18"
                fill="hsl(var(--primary) / 0.15)"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
              />
              {/* Heartbeat line */}
              <motion.path
                d="M20 40 L32 40 L36 28 L40 52 L44 28 L48 40 L60 40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              />
            </motion.svg>

            {/* Brand text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-2xl md:text-3xl font-display font-bold tracking-tight gradient-text">
                COR-SYS
              </span>
              <motion.p
                className="text-xs md:text-sm text-muted-foreground/60 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                Organizational Resilience
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Expanding ring on phase "expand" */}
          {phase === "expand" && (
            <motion.div
              className="absolute rounded-full border border-primary/30"
              initial={{ width: 100, height: 100, opacity: 0.8 }}
              animate={{ width: "300vmax", height: "300vmax", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
