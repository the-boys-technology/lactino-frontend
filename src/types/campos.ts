export type CampoConfig = {
  name: string;
  type: "text" | "number" | "date" | "select";
  label?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
};
