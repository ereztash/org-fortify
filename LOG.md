# Project Log — org-fortify (COR-SYS)

## 2026-03-24 — Diagnostic Wizard + Cross-Domain UX Upgrade

### מה נבנה
1. `src/lib/diagnosticQuestions.ts` — 9 שאלות אבחון (זמן/כסף/קשב)
2. `src/lib/diagnosticScoring.ts` — System Health Index, mirror sentence, dynamic CTA, share cliffhanger
3. `src/components/landing/DiagnosticSection.tsx` — ויזארד מלא עם 5 phases
4. `src/pages/Index.tsx` — DiagnosticSection נוסף בין PainSection ל-BridgeSection

### ארכיטקטורה
- **5 phases:** intro → questions → micro-reveal → computing → result
- **Micro-revelations** אחרי q3 (זמן) ו-q6 (כסף) — flash של דליפה חלקית
- **Computing animation** — 4 שניות לפני revelation (narrative tension)
- **Sequential reveal** — best→worst (peak-end rule)
- **Mirror sentence** — מחזיר לכיוון תשובות המשתמש כנרטיב
- **Dynamic CTA** — 3 הודעות WhatsApp שונות לפי dominantLeak
- **Share cliffhanger** — "הדליפה שלי היא ב... מה שלך?"

### Stack הקיים שצריך להישמר
- `framer-motion` — כל אנימציה דרך motion components
- `.glass` utility class — glassmorphism על כל cards
- `health-*` CSS tokens — critical/warning/stable/optimal
- `gradient-text` / `gradient-text-warm` — text gradients
- `RESOURCE_COLORS` — time=blue, money=green, attention=amber
- WhatsApp number: `972524545963`
- `useCOR()` context קיים — ROIEngine משתמש בו, DiagnosticSection עצמאי ממנו

### לקח מהשיחה — יעילות session
**בעיה:** 8 סיבובי שאלה/תכנון לפני ביצוע. היה צריך 2-3.

**גורמים:**
- שאלות בירור סדרתיות במקום מקביל
- Plan Mode הופעל לפני קריאת קוד קיים
- Cross-domain skill רץ לפני שנראה הקוד → תכנון גנרי שהצריך התאמה
- Agent החזיר קוד מלא (600 שורות) שנכתב מחדש ממילא

**תיקון שהוטמע ב-CLAUDE.md:**
- שאלת בירור אחת מובנית (4 ממדים)
- Plan Mode רק כשיש אי-ודאות ארכיטקטורית אמיתית
- קרא קוד → הפעל skill → בצע (לא הפוך)
- מ-agents: ארכיטקטורה בלבד, לא קוד מלא

---

## פטרנים שחוזרים בפרויקט

### הוספת section לדף הנחיתה
1. צור קומפוננטה ב-`src/components/landing/`
2. הוסף import + JSX ל-`src/pages/Index.tsx`
3. השתמש ב-`section-divider`, `glass`, `scroll-mt-20`, `id` לnavigation
4. Framer motion: `whileInView` עם `viewport={{ once: true, margin: "-80px" }}`

### WhatsApp CTA pattern
```ts
const url = `https://wa.me/972524545963?text=${encodeURIComponent(text)}`;
```

### Health colors
```ts
// Use CSS variables, not hardcoded colors:
'hsl(var(--health-critical))'  // red
'hsl(var(--health-warning))'   // amber
'hsl(var(--health-stable))'    // green
'hsl(var(--health-optimal))'   // blue
```
