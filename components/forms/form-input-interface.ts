export interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  description?: string;
  data?: unknown[];
  value?: (value: string) => void;
}
