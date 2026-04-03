import { tasseFramework } from "@/data/tasse-framework";
import { AssessmentAnswers, StoredAssessment } from "@/types/tasse";

export const STORAGE_KEY = "tasse-assessment-v2026";

const isClient = typeof window !== "undefined";

export const createEmptyAssessment = (): StoredAssessment => ({
  frameworkId: tasseFramework.id,
  frameworkVersion: tasseFramework.version,
  answers: {},
  updatedAt: new Date().toISOString(),
});

export const loadAssessment = (): StoredAssessment => {
  if (!isClient) {
    return createEmptyAssessment();
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return createEmptyAssessment();
  }

  try {
    const parsed = JSON.parse(raw) as StoredAssessment;

    if (
      parsed.frameworkId !== tasseFramework.id ||
      parsed.frameworkVersion !== tasseFramework.version
    ) {
      return createEmptyAssessment();
    }

    return {
      ...createEmptyAssessment(),
      ...parsed,
      answers: parsed.answers ?? {},
    };
  } catch {
    return createEmptyAssessment();
  }
};

export const saveAssessmentDraft = (answers: AssessmentAnswers) => {
  if (!isClient) {
    return;
  }

  const existing = loadAssessment();
  const draft: StoredAssessment = {
    ...existing,
    answers,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
};

export const submitAssessment = (answers: AssessmentAnswers) => {
  if (!isClient) {
    return undefined;
  }

  const submittedAt = new Date().toISOString();
  const payload: StoredAssessment = {
    frameworkId: tasseFramework.id,
    frameworkVersion: tasseFramework.version,
    answers,
    updatedAt: submittedAt,
    submittedAt,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return submittedAt;
};

export const resetAssessment = () => {
  if (!isClient) {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
};
