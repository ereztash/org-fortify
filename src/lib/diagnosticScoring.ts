import {
  DiagnosticAnswers,
  DiagnosticQuestion,
  DIAGNOSTIC_QUESTIONS,
  ResourceType,
  ThresholdLabel,
} from './diagnosticQuestions';

// Resource weights for System Health Index
const RESOURCE_WEIGHTS: Record<ResourceType, number> = {
  attention: 0.40,
  time: 0.35,
  money: 0.25,
};

const WEEKLY_WORK_HOURS = 50;

export interface ResourceScore {
  resource: ResourceType;
  leakScore: number;   // 0–100 (higher = more leak = worse)
  label: ThresholdLabel;
  color: string;
}

export interface DiagnosticResult {
  time: ResourceScore;
  money: ResourceScore;
  attention: ResourceScore;
  healthIndex: number;       // 0–100 (higher = healthier)
  healthLabel: ThresholdLabel;
  healthColor: string;
  dominantLeak: ResourceType;
  weeklyDragHours: number;
  revealOrder: ResourceType[]; // sorted best→worst for peak-end reveal
}

function getRawLeak(answer: number, q: DiagnosticQuestion): number {
  const normalized = (answer - 1) / 4; // 0.0 → 1.0
  return q.leakDirection === 'high' ? normalized : 1 - normalized;
}

function leakToLabel(leakScore: number): ThresholdLabel {
  if (leakScore >= 70) return 'קריטי';
  if (leakScore >= 40) return 'לא יציב';
  if (leakScore >= 20) return 'תקין';
  return 'אופטימלי';
}

function leakToColor(leakScore: number): string {
  if (leakScore >= 70) return 'hsl(var(--health-critical))';
  if (leakScore >= 40) return 'hsl(var(--health-warning))';
  if (leakScore >= 20) return 'hsl(var(--health-stable))';
  return 'hsl(var(--health-optimal))';
}

function healthToLabel(healthIndex: number): ThresholdLabel {
  if (healthIndex <= 30) return 'קריטי';
  if (healthIndex <= 60) return 'לא יציב';
  if (healthIndex <= 80) return 'תקין';
  return 'אופטימלי';
}

export function computeResourceScore(resource: ResourceType, answers: DiagnosticAnswers): ResourceScore {
  const questions = DIAGNOSTIC_QUESTIONS.filter(q => q.resource === resource);
  let weightedSum = 0;
  let totalWeight = 0;

  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined) continue;
    weightedSum += getRawLeak(answer, q) * q.weight;
    totalWeight += q.weight;
  }

  const leakScore = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) : 0;

  return {
    resource,
    leakScore,
    label: leakToLabel(leakScore),
    color: leakToColor(leakScore),
  };
}

export function computeDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult {
  const time = computeResourceScore('time', answers);
  const money = computeResourceScore('money', answers);
  const attention = computeResourceScore('attention', answers);

  const weightedLeak =
    time.leakScore * RESOURCE_WEIGHTS.time +
    money.leakScore * RESOURCE_WEIGHTS.money +
    attention.leakScore * RESOURCE_WEIGHTS.attention;

  const healthIndex = Math.max(0, Math.round(100 - weightedLeak));
  const healthLabel = healthToLabel(healthIndex);
  const healthColor = leakToColor(100 - healthIndex);

  const scores = { time, money, attention };
  const dominantLeak = (Object.entries(scores) as [ResourceType, ResourceScore][])
    .reduce((a, b) => (a[1].leakScore > b[1].leakScore ? a : b))[0];

  // Peak-end rule: reveal in order best → middle → worst
  const revealOrder = ([...Object.entries(scores)] as [ResourceType, ResourceScore][])
    .sort((a, b) => a[1].leakScore - b[1].leakScore)
    .map(([r]) => r);

  const weeklyDragHours = Math.round(
    (time.leakScore / 100) * WEEKLY_WORK_HOURS * RESOURCE_WEIGHTS.time * 2 +
    (attention.leakScore / 100) * WEEKLY_WORK_HOURS * RESOURCE_WEIGHTS.attention * 2
  );

  return { time, money, attention, healthIndex, healthLabel, healthColor, dominantLeak, weeklyDragHours, revealOrder };
}

export function isDiagnosticComplete(answers: DiagnosticAnswers): boolean {
  return DIAGNOSTIC_QUESTIONS.every(q => answers[q.id] !== undefined);
}

export function getDiagnosticProgress(answers: DiagnosticAnswers): number {
  const answered = DIAGNOSTIC_QUESTIONS.filter(q => answers[q.id] !== undefined).length;
  return Math.round((answered / DIAGNOSTIC_QUESTIONS.length) * 100);
}

// ── Mirror Sentence (Anagnorisis) ────────────────────────────────────────────
// Reflects the user's own answers back as a narrative — proves the system listened.
export function buildMirrorSentence(answers: DiagnosticAnswers, dominantLeak: ResourceType): string {
  const parts: string[] = [];

  if (dominantLeak === 'attention') {
    const q7 = answers['q7']; // interruptions
    const q8 = answers['q8']; // decision fatigue
    const q9 = answers['q9']; // open loops
    if (q7 >= 3) parts.push(`מופרע ${q7 >= 4 ? 'יותר מ-10' : '6+'} פעמים ביום`);
    if (q8 >= 3) parts.push('כל החלטה דורשת מחשבה מחדש');
    if (q9 >= 3) parts.push(`${q9 >= 4 ? '16+' : '9+'} נושאים פתוחים ברקע`);
  } else if (dominantLeak === 'time') {
    const q1 = answers['q1']; // context switching
    const q2 = answers['q2']; // rework
    const q3 = answers['q3']; // process clarity
    if (q1 >= 3) parts.push(`${q1 >= 4 ? '11+' : '6+'} מעברי הקשר ביום`);
    if (q2 >= 3) parts.push(`${q2 >= 4 ? '30%+' : '15%+'} מהעבודה חוזרת על עצמה`);
    if (q3 <= 2) parts.push('תהליכים לא מתועדים');
  } else {
    const q4 = answers['q4']; // micro-spend
    const q5 = answers['q5']; // cost awareness
    const q6 = answers['q6']; // scope creep
    if (q4 >= 3) parts.push('הוצאות לא מתועדות כל שבוע');
    if (q5 <= 2) parts.push('אין מספר ברור לעלות שעה');
    if (q6 >= 3) parts.push('פרויקטים חורגים באופן קבוע');
  }

  if (parts.length === 0) return '';
  return parts.join(', ') + '.';
}

// ── Dynamic CTA (Mentor Archetype) ───────────────────────────────────────────
// CTA text that matches the revealed weakness — hero's journey mentor moment.
export function getDynamicCTA(result: DiagnosticResult): { text: string; whatsappUrl: string } {
  const resourceLabels: Record<ResourceType, string> = { time: 'זמן', money: 'כסף', attention: 'קשב' };
  const dominant = resourceLabels[result.dominantLeak];
  const score = result[result.dominantLeak].leakScore;

  const ctaMap: Record<ResourceType, { text: string; waText: string }> = {
    attention: {
      text: `הקשב שלך הוא המשאב הכי שחוק. ב-15 דקות אני יכול להראות לך את 3 השינויים שיחזירו לך את הפוקוס.`,
      waText: `היי ארז, עשיתי את האבחון — דליפת קשב ${score}%. הקשב שלי הוא הנקודה הכי חלשה. אשמח ל-15 דקות על 3 שינויים ממוקדים.`,
    },
    time: {
      text: `הזמן שלך דולף ב-${result.weeklyDragHours} שעות בשבוע. יש לי פרוטוקול ספציפי לזה.`,
      waText: `היי ארז, עשיתי את האבחון — דליפת זמן ${score}%, ~${result.weeklyDragHours} שעות בשבוע. אשמח לשמוע על הפרוטוקול.`,
    },
    money: {
      text: `אתה מוציא כסף על דברים שאתה לא מודד. בוא נעשה חשבון מדויק ב-15 דקות.`,
      waText: `היי ארז, עשיתי את האבחון — דליפת כסף ${score}%. הוצאות לא מתועדות ו-scope creep. אשמח לפגישת חשבון מדויק.`,
    },
  };

  const cta = ctaMap[result.dominantLeak];
  return {
    text: cta.text,
    whatsappUrl: `https://wa.me/972524545963?text=${encodeURIComponent(cta.waText)}`,
  };
}

// ── Share Cliffhanger ────────────────────────────────────────────────────────
export function buildShareCliffhanger(result: DiagnosticResult, shareUrl: string): string {
  const resourceLabels: Record<ResourceType, string> = { time: 'זמן', money: 'כסף', attention: 'קשב' };
  const dominant = resourceLabels[result.dominantLeak];
  const score = result[result.dominantLeak].leakScore;
  return `הדליפה הגדולה שלי היא ב${dominant} — ${score}%. מה שלך?\n${shareUrl}`;
}

// ── URL Encoding/Decoding ─────────────────────────────────────────────────────
// Encodes 9 answers (each 1-5) as a compact base64 string in the URL hash.
// Format: q1q2q3q4q5q6q7q8q9 → e.g. "135243421" → btoa → URL hash #d=...
export function encodeDiagnosticToHash(answers: DiagnosticAnswers): string {
  const digits = ['q1','q2','q3','q4','q5','q6','q7','q8','q9']
    .map(id => String(answers[id] ?? '0'))
    .join('');
  return btoa(digits);
}

export function decodeDiagnosticFromHash(hash: string): DiagnosticAnswers | null {
  try {
    const param = new URLSearchParams(hash.replace(/^#/, '')).get('d');
    if (!param) return null;
    const digits = atob(param);
    if (!/^[1-5]{9}$/.test(digits)) return null;
    const ids = ['q1','q2','q3','q4','q5','q6','q7','q8','q9'];
    return Object.fromEntries(ids.map((id, i) => [id, parseInt(digits[i])]));
  } catch {
    return null;
  }
}

export function buildShareUrl(answers: DiagnosticAnswers): string {
  const encoded = encodeDiagnosticToHash(answers);
  const base = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://org-fortify.lovable.app';
  return `${base}#d=${encoded}`;
}
