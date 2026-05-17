export type AppSection = "input" | "lean-canvas" | "persona" | "competitor" | "vpc" | "ai-prompts";

export interface PromptItem {
  category: string;
  title: string;
  useCase: string;
  prompt: string;
}

export interface LeanCanvas {
  problem: string[];
  customerSegments: string[];
  uvp: string;
  unfairAdvantage: string;
  solution: string[];
  channels: string[];
  keyMetrics: string[];
  costStructure: string[];
  revenueStreams: string[];
}

export interface Persona {
  name: string;
  age: number;
  occupation: string;
  income: string;
  location: string;
  bio: string;
  goals: string[];
  painPoints: string[];
  behaviors: string[];
}

export interface Competitor {
  name: string;
  target: string;
  strengths: string;
  weaknesses: string;
  pricing: string;
  ourAdvantage: string;
}

export interface VPC {
  valueMap: {
    products: string[];
    painRelievers: string[];
    gainCreators: string[];
  };
  customerProfile: {
    jobs: string[];
    pains: string[];
    gains: string[];
  };
}

export interface ValidationData {
  appName: string;
  leanCanvas: LeanCanvas;
  persona: Persona;
  competitors: Competitor[];
  vpc: VPC;
}
