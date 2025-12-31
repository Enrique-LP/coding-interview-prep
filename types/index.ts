export type StrategyType = string;

export interface Step {
  id: number;
  instruction: string;
  placeholderCode: string;
  validationRegex: string;
  locked?: boolean;
  userCode?: string;
  hint?: string;
  solutionCode?: string;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  steps: Step[];
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  examples: Example[];
  constraints?: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  strategies: {
    [key: string]: Strategy;
  };
}
