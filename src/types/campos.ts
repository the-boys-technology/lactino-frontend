export type CampoConfig = 
  | { name: string, type: 'text' | 'date' | 'number'; placeholder: string }
  | { name: string, type: 'select'; label: string; options: { label: string; value: string }[] };
