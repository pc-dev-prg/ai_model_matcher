
export interface Option {
  value: string;
  label: string;
}

export const ALL_OPTIONS_VALUE = "__ALL__";

export const TASK_TYPE_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "All task types" },
  { value: "automation", label: "Automation" },
  { value: "chatbot", label: "Chatbot" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "content-generation", label: "Content Generation" },
  { value: "coding", label: "Coding" },
  { value: "search", label: "Search" },
];

export const COMPLEXITY_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "All complexities" },
  { value: "low-complexity", label: "Low" },
  { value: "medium-complexity", label: "Medium" },
  { value: "high-complexity", label: "High" },
];

export const TOKEN_VOLUME_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "Any volume" },
  { value: "0.05", label: "<100K tokens / month" },
  { value: "0.5", label: "100K–1M tokens / month" },
  { value: "5", label: "1M–10M tokens / month" },
  { value: "15", label: ">10M tokens / month" },
];

export const TOKEN_VOLUME_MAP: { [key: string]: number } = {
  "0.05": 0.05,
  "0.5": 0.5,
  "5": 5,
  "15": 15,
  // ALL_OPTIONS_VALUE will not be in this map, leading to tokenVolumeM being undefined,
  // which correctly disables budget filtering if token volume isn't specified.
};

export const SPEED_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "Any speed" },
  { value: "fast-speed", label: "Fast" },
  { value: "normal-speed", label: "Normal" },
  { value: "slow-speed", label: "Slow" },
];

export const SORT_OPTIONS: Option[] = [
  { value: "name", label: "Model Name (A-Z)" },
  { value: "input_price", label: "Input Price (cheapest first)" },
  { value: "output_price", label: "Output Price (cheapest first)" },
];

export const SPECIAL_REQUIREMENTS_LIST = [
  { id: "multimodal", label: "Multimodal input", tag: "multimodal", iconHint: "image video" },
  { id: "longContext", label: "Long context", tag: "long-context", iconHint: "text layers" },
  { id: "czechSupport", label: "Czech support", tag: "cz", iconHint: "language flag" },
  { id: "codeGeneration", label: "Code generation", tag: "code", iconHint: "code brackets" },
  { id: "highPrivacy", label: "High privacy", tag: "high-privacy", iconHint: "shield lock" },
  { id: "realtimeData", label: "Real-time data", tag: "real-time", iconHint: "clock graph" },
];

export type SpecialRequirementsKeys = typeof SPECIAL_REQUIREMENTS_LIST[number]['id'];

export interface AiModel {
  name: string;
  provider: string;
  input_price: number;
  output_price: number;
  usage: string;
  tags: string[];
}

export interface Filters {
  taskType: string;
  complexity: string;
  budget: string; // string from input, convert to number for calc
  tokenVolume: string;
  speed: string;
  specialRequirements: Record<SpecialRequirementsKeys, boolean>;
}
