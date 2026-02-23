

# COR-SYS v3.4 — מערכת אבחון וחוסן ארגוני

## סקירה כללית
מערכת Full-Stack לאבחון וחיזוק חוסן ארגוני עם סנכרון סמנטי בין כל המודולים: תובנות AI משפיעות על ה-ROI, וה-ROI משפיע על תעדוף Tourniquets. הכל דרך Global State אחיד.

---

## שלב 0: זהות, עיצוב מערכתי ו-Active Response UI

- **Surgical Dark Mode:** ערכת צבעים Slate-950 עם Glassmorphism
- **Active Response UI:** צבעי הממשק משתנים דינמית לפי Health Score — Alert Red/Amber כשקריטי, Emerald/Blue כשיציב
- **RTL מלא בעברית**, נגישות WCAG 2.1 AA, ניווט מקלדת, ניגודיות להקרנה
- **רכיב "Meet the Architect":** הצגת המייסד כעובד סוציאלי מערכתי — "מתקנים את המבנה, לא את הנפש"
- **טון Hebrish Type A:** דליל, טכני, סמכותי

## שלב 1: בסיס נתונים ו-Global State (Supabase)

- **organizations:** id, name, industry, size
- **diagnostics:** id, org_id, h_hours, c_cost, p_probability, delta_potential, **ai_risk_factor**, status
- **audit_log:** id, org_id, type, content, **semantic_weight**, source
- **tourniquets:** id, org_id, title, priority, status, **linked_insight_id**
- **React Context** כ-Single Source of Truth — מחבר בין נתוני AI, ROI, ו-Tourniquets
- **Supabase Auth** עם Magic Link
- **RLS** — הפרדה קשיחה בין ארגונים

## שלב 2: דף נחיתה ומנוע ROI דינמי

- **דף נחיתה:** זהות הארכיטקט, הצגת ערך, קריאה לפעולה
- **מחשבון ROI:** סליידרים ל-H, C, P עם נוסחה שקופה
- **נוסחה דינמית:** ΔPotential = (H × C × 52) × (P + ai_risk_factor) — ה-ROI מתעדכן אוטומטית כשה-AI מזהה כשלים חדשים
- **גרף Recharts:** עלות אי-עשייה מול פוטנציאל חוסן
- **Glass Box:** הנוסחה וכל הפרמטרים מוצגים בשקיפות מלאה

## שלב 3: ASA — מנוע תובנות סוקרטי

- **Edge Function** מחוברת למודל AI לניתוח טקסטים ארגוניים
- **עדשה כפולה:** זיהוי נורמליזציה של סטייה, סתירות לוגיות, וכשלים מבניים
- **Semantic Mapping:** כל תובנה מקבלת משקל (0-1) שמזין את ai_risk_factor — וכך משפיעה ישירות על ה-ROI
- **"הבזקי תובנה"** עם כפתור **"הפוך ל-Tourniquet"** — מעבר ישיר מאבחון לפעולה
- **תיעוד ב-Audit Log** עם semantic_weight ו-source

## שלב 4: דאשבורד — Resilience Command Center

- **Health Score Gauge:** מדד מעגלי המושפע מ-ROI + ממצאי AI — משנה את צבעי הממשק (Active Response UI)
- **Tourniquet Management:** ניהול פעולות מניעתיות עם סטטוס, תעדוף אוטומטי לפי משקל התובנה
- **Interactive Gantt:** ספרינט 14 יום — Diagnostic → Engineering → Tourniquet → Validation
- **Glass Box Log:** יומן שקוף המציג את שרשרת ההסקה (Reasoning Trace) של המערכת

## שלב 5: המרה, אוטומציה וביצועים

- **מעבר מאובטח:** Landing → Magic Link Auth → Dashboard
- **Quote Engine:** הפקת PDF עם ROI מעודכן, ניתוח AI, והצעת מחיר לספרינט
- **React Suspense + Lazy Loading:** טעינה עצלנית לשיפור ביצועים
- **Meta-Log:** תצוגת היסטוריית פעולות מלאה מתוך ה-Audit Log

