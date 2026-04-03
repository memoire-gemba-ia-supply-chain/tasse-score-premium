import { tasseFramework } from "@/data/tasse-framework";
import {
  AssessmentAnswers,
  AssessmentResult,
  DomainResult,
  RiskScore,
  TasseCategory,
} from "@/types/tasse";

const recommendationByCategory: Record<string, string[]> = {
  "technological-threats": [
    "Commission a board-level cyber resilience review with clear KRIs and incident escalation thresholds.",
    "Validate resilience against deep fake, deep voice, and disinformation scenarios through simulation exercises.",
  ],
  "adverse-media-coverage": [
    "Refresh executive and board media protocols with role-based escalation playbooks.",
    "Run quarterly stress tests for reputational crisis response and public messaging alignment.",
  ],
  "supply-chain-challenges": [
    "Tighten supplier due diligence with explicit human-rights criteria and remediation milestones.",
    "Introduce transparent third-party assurance for ethical sourcing and labor standards compliance.",
  ],
  "social-responsibility-expectations": [
    "Define measurable ESG and CSR outcomes linked to executive accountability and reporting cycles.",
    "Strengthen stakeholder feedback loops to track trust, impact credibility, and perceived authenticity.",
  ],
  "ethical-dilemmas-pressure": [
    "Expand whistleblowing confidence mechanisms with independent oversight and response SLAs.",
    "Embed ethics decision checkpoints into high-pressure operational and commercial workflows.",
  ],
};

export const getAnsweredCount = (answers: AssessmentAnswers): number => {
  return Object.values(answers).filter((value): value is RiskScore => value !== undefined)
    .length;
};

export const getDomainScore = (
  category: TasseCategory,
  answers: AssessmentAnswers,
): number => {
  return category.questions.reduce((sum, question) => {
    return sum + (answers[question.id] ?? 0);
  }, 0);
};

export const getDomainCompletion = (
  category: TasseCategory,
  answers: AssessmentAnswers,
): number => {
  const answered = category.questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  return Math.round((answered / category.questions.length) * 100);
};

export const getDomainBand = (score: number) => {
  return (
    tasseFramework.domainBands.find((band) => score >= band.min && score <= band.max) ??
    tasseFramework.domainBands[tasseFramework.domainBands.length - 1]
  );
};

export const getTotalInterpretation = (score: number): string => {
  return (
    tasseFramework.totalInterpretations.find(
      (band) => score >= band.min && score <= band.max,
    )?.statement ?? "No interpretation available"
  );
};

export const getDomainResults = (answers: AssessmentAnswers): DomainResult[] => {
  return tasseFramework.categories.map((category) => {
    const score = getDomainScore(category, answers);
    const band = getDomainBand(score);

    return {
      categoryId: category.id,
      title: category.title,
      score,
      maxScore: 20,
      level: band.label,
      summary: band.summary,
      completion: getDomainCompletion(category, answers),
    };
  });
};

export const calculateAssessmentResult = (
  answers: AssessmentAnswers,
  submittedAt?: string,
): AssessmentResult => {
  const domains = getDomainResults(answers);
  const totalScore = domains.reduce((sum, domain) => sum + domain.score, 0);

  return {
    totalScore,
    maxScore: 100,
    globalStatement: getTotalInterpretation(totalScore),
    domains,
    completedQuestions: getAnsweredCount(answers),
    totalQuestions: tasseFramework.categories.length * 10,
    submittedAt,
  };
};

export const getInsights = (answers: AssessmentAnswers) => {
  const result = calculateAssessmentResult(answers);
  const ranked = [...result.domains].sort((a, b) => b.score - a.score);

  const topRiskExposures = ranked.slice(0, 2);
  const immediateAttention = ranked.filter((domain) => domain.score >= 13);
  const moderateConcerns = ranked.filter(
    (domain) => domain.score >= 9 && domain.score <= 12,
  );
  const strongestAreas = [...ranked]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  const recommendations = topRiskExposures
    .flatMap((domain) => recommendationByCategory[domain.categoryId] ?? [])
    .slice(0, 4);

  return {
    topRiskExposures,
    immediateAttention,
    moderateConcerns,
    strongestAreas,
    recommendations,
    governanceSummary:
      result.totalScore >= 61
        ? "Board oversight should move into active mitigation cadence with sharper controls ownership."
        : result.totalScore >= 41
          ? "Governance posture is viable but requires targeted strengthening in critical exposure areas."
          : "Governance fundamentals appear strong; focus on preserving resilience and early warning discipline.",
  };
};
