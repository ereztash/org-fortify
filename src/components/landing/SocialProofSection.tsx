import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2, Banknote, Shield } from "lucide-react";

const stats = [
  { icon: Building2, value: 42, suffix: "", label: "ארגונים אובחנו" },
  { icon: Banknote, value: 8.5, suffix: "M₪", label: "נחסכו ללקוחות", decimals: 1 },
  { icon: Shield, value: 127, suffix: "", label: "חוסמי עורקים הוטמעו" },
];

function CountUp({ target, decimals = 0, suffix = "" }: { target: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold font-display text-primary tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
}

export function SocialProofSection() {
  return (
    <section className="py-20 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center space-y-3"
            >
              <div className="flex justify-center">
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CountUp target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
