
export interface Option {
  value: string;
  label: string;
}

export const ALL_OPTIONS_VALUE = "__ALL__";

export const TASK_TYPE_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "Všechny typy úloh" },
  { value: "automation", label: "Automatizace" },
  { value: "chatbot", label: "Chatbot" },
  { value: "data-analysis", label: "Analýza dat" },
  { value: "content-generation", label: "Generování obsahu" },
  { value: "coding", label: "Kódování" },
  { value: "search", label: "Vyhledávání" },
];

export const COMPLEXITY_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "Všechny složitosti" },
  { value: "low-complexity", label: "Nízká" },
  { value: "medium-complexity", label: "Střední" },
  { value: "high-complexity", label: "Vysoká" },
];

export const TOKEN_VOLUME_OPTIONS: Option[] = [
  { value: ALL_OPTIONS_VALUE, label: "Jakýkoliv objem" },
  { value: "0.05", label: "<100K tokenů / měsíc" },
  { value: "0.5", label: "100K–1M tokenů / měsíc" },
  { value: "5", label: "1M–10M tokenů / měsíc" },
  { value: "15", label: ">10M tokenů / měsíc" },
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
  { value: ALL_OPTIONS_VALUE, label: "Jakákoliv rychlost" },
  { value: "fast-speed", label: "Rychlá" },
  { value: "normal-speed", label: "Normální" },
  { value: "slow-speed", label: "Pomalá" },
];

export const SORT_OPTIONS: Option[] = [
  { value: "name", label: "Abecedně podle názvu modelu" },
  { value: "input_price", label: "Cena za vstupní tokeny (nejlevnější)" },
  { value: "output_price", label: "Cena za výstupní tokeny (nejlevnější)" },
];

export const SPECIAL_REQUIREMENTS_LIST = [
  { id: "multimodal", label: "Multimodální vstup", tag: "multimodal", iconHint: "image video" },
  { id: "longContext", label: "Dlouhý kontext", tag: "long-context", iconHint: "text layers" },
  { id: "czechSupport", label: "Podpora češtiny", tag: "cz", iconHint: "language flag" },
  { id: "codeGeneration", label: "Generování kódu", tag: "code", iconHint: "code brackets" },
  { id: "highPrivacy", label: "Vysoká privacy", tag: "high-privacy", iconHint: "shield lock" },
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
