export type RiskScore = 0 | 1 | 2;

export type Question = {
  id: string;
  text: string;
};

export type TasseCategory = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  exposureTitle: string;
  questions: Question[];
};

export type ScoreBand = {
  label: string;
  min: number;
  max: number;
  summary: string;
};

export type TotalInterpretationBand = {
  min: number;
  max: number;
  statement: string;
};

export type TasseFramework = {
  id: string;
  name: string;
  version: string;
  categories: TasseCategory[];
  domainBands: ScoreBand[];
  totalInterpretations: TotalInterpretationBand[];
};

export type AssessmentAnswers = Record<string, RiskScore | undefined>;

export type DomainResult = {
  categoryId: string;
  title: string;
  score: number;
  maxScore: number;
  level: string;
  summary: string;
  completion: number;
};

export type AssessmentResult = {
  totalScore: number;
  maxScore: number;
  globalStatement: string;
  domains: DomainResult[];
  completedQuestions: number;
  totalQuestions: number;
  submittedAt?: string;
};

export type StoredAssessment = {
  frameworkId: string;
  frameworkVersion: string;
  answers: AssessmentAnswers;
  updatedAt: string;
  submittedAt?: string;
};
