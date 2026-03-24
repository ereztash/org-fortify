export type ResourceType = 'time' | 'money' | 'attention';
export type QuestionFormat = 'mcq' | 'slider';
export type ThresholdLabel = 'קריטי' | 'לא יציב' | 'תקין' | 'אופטימלי';

export interface MCQOption {
  value: number; // 1–5
  label: string;
}

export interface DiagnosticQuestion {
  id: string;
  resource: ResourceType;
  format: QuestionFormat;
  text: string;
  subtext?: string;
  weight: number;
  leakDirection: 'high' | 'low';
  options?: MCQOption[];
  sliderLabels?: { low: string; high: string };
}

export interface DiagnosticAnswers {
  [questionId: string]: number; // 1–5
}

export const RESOURCE_LABELS: Record<ResourceType, string> = {
  time: 'זמן',
  money: 'כסף',
  attention: 'קשב',
};

export const RESOURCE_COLORS: Record<ResourceType, string> = {
  time: 'hsl(210 92% 56%)',    // --accent-cool (blue)
  money: 'hsl(160 84% 39%)',   // --primary (green)
  attention: 'hsl(38 92% 50%)', // --accent-warm (amber)
};

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // ── זמן (Time) ──
  {
    id: 'q1',
    resource: 'time',
    format: 'mcq',
    text: 'כמה פעמים ביום אתה עובר בין משימות שאינן קשורות זו לזו?',
    subtext: 'מעבר בין הקשרים — מייל, פגישה, פרויקט, שיחה',
    weight: 1.2,
    leakDirection: 'high',
    options: [
      { value: 1, label: '1–2 פעמים' },
      { value: 2, label: '3–5 פעמים' },
      { value: 3, label: '6–10 פעמים' },
      { value: 4, label: '11–20 פעמים' },
      { value: 5, label: 'יותר מ-20 — זרימה מפוצלת' },
    ],
  },
  {
    id: 'q2',
    resource: 'time',
    format: 'mcq',
    text: 'כמה אחוז מהעבודה שסיימת בשבוע שעבר הצריכה תיקון, שכתוב או חזרה עליה?',
    subtext: 'עבודה שכבר "נגמרה" אבל לא הייתה מוגמרת באמת',
    weight: 1.3,
    leakDirection: 'high',
    options: [
      { value: 1, label: 'פחות מ-5%' },
      { value: 2, label: '5–15%' },
      { value: 3, label: '15–30%' },
      { value: 4, label: '30–50%' },
      { value: 5, label: 'יותר מ-50%' },
    ],
  },
  {
    id: 'q3',
    resource: 'time',
    format: 'slider',
    text: 'עד כמה ברורים תהליכי העבודה שלך — מי עושה מה, מתי, ולפי איזו רמת איכות?',
    subtext: 'בוחן בהירות תפעולית, לא מוטיבציה',
    weight: 1.0,
    leakDirection: 'low',
    sliderLabels: {
      low: 'כלום לא כתוב, הכול בזיכרון',
      high: 'הכול מתועד, אוטומטי וצפוי',
    },
  },
  // ── כסף (Money) ──
  {
    id: 'q4',
    resource: 'money',
    format: 'mcq',
    text: 'כמה החלטות הוצאה קטנות מתקבלות בעסק שלך ללא תיעוד או אישור?',
    subtext: 'מיקרו-הוצאות — כלים, מנויים, ספקים',
    weight: 1.1,
    leakDirection: 'high',
    options: [
      { value: 1, label: 'הכול מתועד ומאושר' },
      { value: 2, label: '1–3 החלטות שבועיות' },
      { value: 3, label: '4–10 החלטות שבועיות' },
      { value: 4, label: 'יותר מ-10, אני לא באמת יודע' },
      { value: 5, label: 'אין לי מושג' },
    ],
  },
  {
    id: 'q5',
    resource: 'money',
    format: 'slider',
    text: 'עד כמה ברור לך מה עולה כל שעת עבודה שלך / של הצוות לעסק?',
    subtext: 'עלות שעה אמיתית כולל תקורה, לא רק שכר',
    weight: 1.4,
    leakDirection: 'low',
    sliderLabels: {
      low: 'אין לי מספר',
      high: 'יש לי מספר מדויק לכל תפקיד',
    },
  },
  {
    id: 'q6',
    resource: 'money',
    format: 'mcq',
    text: 'כמה פעמים בחודש פרויקט "גדל" מעבר לסכום המוסכם ללא תשלום נוסף?',
    subtext: 'scope creep — עבודה שניתנת אך לא חויבה',
    weight: 1.2,
    leakDirection: 'high',
    options: [
      { value: 1, label: 'כמעט אף פעם' },
      { value: 2, label: '1–2 פעמים' },
      { value: 3, label: '3–5 פעמים' },
      { value: 4, label: 'כל שבוע' },
      { value: 5, label: 'כמעט כל פרויקט חורג' },
    ],
  },
  // ── קשב (Attention) ──
  {
    id: 'q7',
    resource: 'attention',
    format: 'mcq',
    text: 'כמה פעמים ביום אתה מופרע ממשימה ממוקדת על ידי הודעה, שיחה, או בקשה לא מתוכננת?',
    subtext: 'כל הפרעה = איפוס של עד 23 דקות לפי מחקר',
    weight: 1.3,
    leakDirection: 'high',
    options: [
      { value: 1, label: '0–2 פעמים' },
      { value: 2, label: '3–5 פעמים' },
      { value: 3, label: '6–10 פעמים' },
      { value: 4, label: '11–20 פעמים' },
      { value: 5, label: 'ברציפות — אף פעם לא בפוקוס' },
    ],
  },
  {
    id: 'q8',
    resource: 'attention',
    format: 'slider',
    text: 'עד כמה כל החלטה שאתה מקבל ביום דורשת מחשבה מחדש, לעומת הפעלת תהליך ברור?',
    subtext: 'עייפות החלטות — כל בחירה שוחקת רוחב פס מנטלי',
    weight: 1.2,
    leakDirection: 'high',
    sliderLabels: {
      low: 'רוב ההחלטות הן תהליכים ברורים',
      high: 'כל החלטה מרגישה כמו בעיה חדשה',
    },
  },
  {
    id: 'q9',
    resource: 'attention',
    format: 'mcq',
    text: 'כמה נושאים "פתוחים" — דברים שלא נסגרו, לא הוחלט עליהם, תלויים ועומדים — מחכים לך ברקע?',
    subtext: 'Open loops — כל אחד שוחק רוחב פס גם כשאתה לא חושב עליו',
    weight: 1.1,
    leakDirection: 'high',
    options: [
      { value: 1, label: '0–3 (מערכת סגורה)' },
      { value: 2, label: '4–8' },
      { value: 3, label: '9–15' },
      { value: 4, label: '16–30' },
      { value: 5, label: 'יותר מ-30' },
    ],
  },
];
