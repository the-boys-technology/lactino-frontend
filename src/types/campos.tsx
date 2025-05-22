export type CampoConfig = 
  | { type: 'text' | 'date' | 'number'; placeholder: string }
  | { type: 'select'; label: string; options: { label: string; value: string }[] };
