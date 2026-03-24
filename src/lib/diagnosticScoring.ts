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

function computeResourceScore(resource: ResourceType, answers: DiagnosticAnswers): ResourceScore {
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

  const weeklyDragHours = Math.round(
    (time.leakScore / 100) * WEEKLY_WORK_HOURS * RESOURCE_WEIGHTS.time * 2 +
    (attention.leakScore / 100) * WEEKLY_WORK_HOURS * RESOURCE_WEIGHTS.attention * 2
  );

  return { time, money, attention, healthIndex, healthLabel, healthColor, dominantLeak, weeklyDragHours };
}

export function isDiagnosticComplete(answers: DiagnosticAnswers): boolean {
  return DIAGNOSTIC_QUESTIONS.every(q => answers[q.id] !== undefined);
}

export function getDiagnosticProgress(answers: DiagnosticAnswers): number {
  const answered = DIAGNOSTIC_QUESTIONS.filter(q => answers[q.id] !== undefined).length;
  return Math.round((answered / DIAGNOSTIC_QUESTIONS.length) * 100);
}

export function buildWhatsAppMessage(result: DiagnosticResult): string {
  const resourceLabels: Record<ResourceType, string> = { time: 'זמן', money: 'כסף', attention: 'קשב' };
  const dominant = resourceLabels[result.dominantLeak];
  const text = `היי ארז, עשיתי את אבחון המשאבים ברמת ${result.healthLabel} (${result.healthIndex}/100). הדליפה הגדולה שלי היא ב${dominant}. אשמח לדבר על מה זה אומר.`;
  return `https://wa.me/972524545963?text=${encodeURIComponent(text)}`;
}
