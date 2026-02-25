

# תוכנית שדרוג COR-SYS — מתודולוגיה מחקרית מלאה

## סקירת מצב נוכחי

הפרויקט כבר כולל תשתית איתנה: דף נחיתה עם 11 סקשנים, דשבורד עם 8 ווידג'טים, Edge Functions ל-ASA ו-Quote, מערכת Auth מוכנה (אך לא מחוברת), וטבלאות DB (organizations, diagnostics, tourniquets, audit_log). הפרומפט מבקש שדרוג רוחבי של כל הרכיבים — מתוכן מחקרי ועד אבטחה.

בגלל היקף העבודה, אחלק לשלושה שלבים לפי סדר עדיפות:

---

## שלב 1: תשתית ואבטחה (קריטי)

### 1.1 חיבור Auth ל-App.tsx
- עטיפת `App` ב-`AuthProvider` (כבר קיים ב-`useAuth.tsx`)
- הוספת Route ל-`/auth`
- עטיפת `/dashboard` ב-`ProtectedRoute` (כבר קיים)
- הדשבורד יהיה מוגן — רק משתמשים מחוברים

### 1.2 JWT Verification ב-Edge Functions
- עדכון `supabase/config.toml`: `verify_jwt = true` לשתי הפונקציות
- הוספת ולידציית JWT בקוד (header `Authorization: Bearer <token>`)

### 1.3 עדכון CORContext — נוסחאות מחקריות
- הוספת `organizationSize` ו-`industry` ל-state
- נוסחת `deltaPotential` חדשה עם `sizeFactor` ו-`industryFactor`
- נוסחת `healthScore` מבוססת J-Quotient: `J = C / E`, סף שבירה ב-0.65
- יצירת `src/lib/industryFactors.ts` עם מפת ענפים (פינטק=1.4, סייבר=1.3, healthtech=1.2)
- הוספת פונקציות: `calculateLatencyCost`, `calculateSemanticDriftCost`

---

## שלב 2: שדרוג דף הנחיתה

### 2.1 HeroSection — Rotating Headlines
- שלוש כותרות מתחלפות עם אנימציית fade:
  - "החברה שלך בנויה על גיבורים? זו בעיה."
  - "ניתחתי 100+ ארגונים. 50% מהם היו על סף קריסה אנטרופית."
  - "בוא נחשב את ה-J-Quotient שלך ב-14 יום."
- הוספת Trust Badges: "100+ ארגונים נותחו", "חיסכון מצטבר: 2M$+"
- StickyNav: הוספת שני כפתורים — "לאבחון מהיר" (דשבורד) + "לעומק המחקר" (אנקר)

### 2.2 PainSection — 3 פתולוגיות מחקריות
- החלפת 4 הכרטיסים הנוכחיים ל-3 כרטיסי פתולוגיות:
  - **נרמול סטייה (NOD)**: "70% מהארגונים סובלים משחיקה בגלל תרבות גיבורים" + אינדיקטור כמותי
  - **שיהוי החלטות**: "עלות ממוצעת 400K$ לשנה" + נוסחה שקופה
  - **סחיפה סמנטית**: "פער בין מה שאתם אומרים לבין מה שאתם עושים"
- כל כרטיס עם אייקון, כותרת, תיאור, ומספר כמותי

### 2.3 BridgeSection — עדכון טקסט
- טקסט חדש: "הבעיה היא לא האנשים, הבעיה היא המבנה. מודל COR-SYS מבוסס על מחקר של 100 ארגונים ו-10,000 סימולציות."

### 2.4 SocialProofSection → SuccessStoriesCarousel (חדש)
- החלפת הציטוט האישי ב-3 מקרי בוחן אמיתיים בפורמט קרוסלה:
  - **Trigo** (פינטק): נרמול סטייה → עלות שיהוי 436,800$ → ספרינט 14 יום → חיסכון
  - **Mesh Payments**: סחיפה סמנטית → 332,800$ → מיקוד מחדש
  - **Navina** (healthtech): הייפ AI vs צורך טקטי → עיכוב פיתוח
- כל כרטיס: Problem → COR-SYS Analysis → Financial Result

### 2.5 HowItWorksSection — 4 שלבים
- עדכון ל-4 שלבים (במקום 3):
  1. אבחון מהיר (ASA Engine)
  2. ניתוח J-Quotient וסף שבירה
  3. התערבות ממוקדת (Tourniquets)
  4. מדידה חוזרת תוך 14 יום

### 2.6 ArchitectSection — מניפסט מחקרי
- עדכון 4 עקרונות המניפסט מהמחקר:
  1. "אובדן משאבים כואב פי 2 מרווח — נעצור את ספירלת האובדן"
  2. "כל סטייה קטנה היא אות חלש לאנטרופיה"
  3. "חוסן זה לא לחזור למצב הקודם — זה Bouncing Forward"
  4. "שקיפות מוחלטת — Glass Box"

### 2.7 EthicsSection — "אני לא עובד עם..."
- הוספת סקשן: "אני לא עובד עם חברות ש..." (כבר יש anti-patterns, נרחיב)

### 2.8 FAQSection — 7 שאלות
- הוספת 2 שאלות חדשות: "זה יקר?" (התנגדות), "כבר ניסינו ייעוץ" (התנגדות)

### 2.9 ROIEngine — CTA דינמי משופר
- עדכון הנוסחה לכלול sizeFactor ו-industryFactor
- הוספת dropdown לבחירת ענף + שדה גודל ארגון

### 2.10 SEO
- הוספת meta tags ב-`index.html`: title, description, OG tags
- הוספת JSON-LD schema לאיש מקצוע

---

## שלב 3: שדרוג הדשבורד

### 3.1 ASAEngine — שאלות מנחות
- הוספת 3 שאלות מנחות מעל ה-textarea:
  - "תאר את תהליך קבלת ההחלטות"
  - "כמה חריגות בטיחות אושרו החודש?"
  - "איזה מסרים אתם משדרים לשוק?"
- הניתוח מחזיר ציון לכל פתולוגיה (0-100)

### 3.2 HealthGauge — J-Quotient
- הצגת ערך J בנוסף ל-Health Score
- קו אדום בסף שבירה (0.65)

### 3.3 GlassBoxLog — מקורות נוסחאות
- הצגת מקור כל חישוב (למשל: "עלות השיהוי = 20 שעות × 175$ × 52 × 0.2")

### 3.4 BenchmarkingEngine (חדש)
- `src/components/dashboard/BenchmarkingEngine.tsx`
- השוואה מול נתונים נורמטיביים: "ביחס לארגונים בגודל שלך, אתה ב-X% אחוזון"
- מבוסס על נתונים סטטיים מהמחקר (100 ארגונים)

### 3.5 QuoteEngine — טופס עם אימייל + שמירת ליד
- הוספת שדות: שם חברה, אימייל, טלפון
- שמירת ליד ב-DB (טבלה חדשה `leads`)
- שליחת ה-PDF + CTA לוואטסאפ

### 3.6 ProfileCard — Trust Badges
- הוספת badges: "100+ ארגונים", "2M$+ נחסכו"

---

## סדר סקשנים סופי בדף הנחיתה

```text
 1. ScrollProgress
 2. StickyNav (+ "לאבחון מהיר" + "לעומק המחקר")
 3. HeroSection (rotating headlines + trust badges)
 4. PainSection (3 פתולוגיות מחקריות)
 5. BridgeSection (עם טקסט מחקרי מעודכן)
 6. SuccessStoriesCarousel (3 מקרי בוחן: Trigo, Mesh, Navina)
 7. HowItWorksSection (4 שלבים)
 8. ArchitectSection (מניפסט 4 עקרונות מחקריים)
 9. ROIEngine (+ ענף + גודל ארגון + CTA דינמי)
10. EthicsSection (+ "אני לא עובד עם...")
11. FAQSection (7 שאלות)
12. LandingFooter
13. WhatsAppFAB
```

---

## קבצים חדשים
- `src/lib/industryFactors.ts`
- `src/components/landing/SuccessStoriesCarousel.tsx`
- `src/components/dashboard/BenchmarkingEngine.tsx`

## קבצים לעדכון
- `src/App.tsx` — AuthProvider + routes
- `src/contexts/CORContext.tsx` — נוסחאות חדשות + שדות חדשים
- `src/pages/Index.tsx` — סדר סקשנים
- `src/pages/Dashboard.tsx` — BenchmarkingEngine
- `src/components/landing/HeroSection.tsx` — rotating headlines + badges
- `src/components/landing/PainSection.tsx` — 3 פתולוגיות
- `src/components/landing/BridgeSection.tsx` — טקסט מעודכן
- `src/components/landing/SocialProofSection.tsx` → יוחלף ב-SuccessStoriesCarousel
- `src/components/landing/HowItWorksSection.tsx` — 4 שלבים
- `src/components/landing/ArchitectSection.tsx` — מניפסט מחקרי
- `src/components/landing/EthicsSection.tsx` — "לא עובד עם..."
- `src/components/landing/FAQSection.tsx` — 7 שאלות
- `src/components/landing/ROIEngine.tsx` — ענף + גודל
- `src/components/landing/StickyNav.tsx` — כפתורים חדשים
- `src/components/dashboard/ASAEngine.tsx` — שאלות מנחות
- `src/components/dashboard/HealthGauge.tsx` — J-Quotient
- `src/components/dashboard/GlassBoxLog.tsx` — מקורות
- `src/components/dashboard/QuoteEngine.tsx` — טופס + ליד
- `src/components/dashboard/ProfileCard.tsx` — badges
- `supabase/config.toml` — JWT verification
- `supabase/functions/asa-analyze/index.ts` — JWT check
- `supabase/functions/generate-quote/index.ts` — JWT check + lead save
- `index.html` — SEO meta tags

## הערה חשובה
בגלל היקף העבודה (~30 קבצים), אתחיל משלב 1 (תשתית + אבטחה + נוסחאות) ואמשיך לשלבים 2-3. זה מבטיח שהבסיס יציב לפני שמשנים UI.

## מיגרציית DB נדרשת
- טבלה חדשה `leads` (name, email, phone, org_name, delta_potential, created_at) עם RLS

