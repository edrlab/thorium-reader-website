export type ConformanceRule = {
  id: string;
  number?: string;
  title: string;
  level?: string;
  result?: string;
  notes?: string;
  issue?: string;
  issuelabel?: string;
  additionalInfo?: string;
  description?: string;
  url?: string;
};

export type ConformanceRuleset = {
  name: string;
  title: string;
  version?: string;
  url?: string;
  referenceUrl?: string;
};

export type ConformanceStandardData = {
  ruleset?: ConformanceRuleset;
  conformanceOverview?: { conformanceSummary?: string; evaluationDate?: string };
  rules?: ConformanceRule[];
};

export type TestedScenario = { date: string; scenario: string; url?: string };

export type TestingMethodology = {
  methodology?: string;
  testingApproaches?: string[];
  testedScenarios?: TestedScenario[];
};

export type ChangelogEntry = { date: string; description: string };

export type PlatformConformanceData = {
  productName?: string;
  version?: string;
  platform?: string;
  evaluationDate?: string;
  conformanceSummary?: string;
  changelog?: ChangelogEntry[];
  testingMethodology?: TestingMethodology;
  rulesets?: Record<string, ConformanceRuleset>;
} & Record<string, unknown>;

export type ConformanceIndex = {
  conformance?: Record<string, PlatformConformanceData>;
};
