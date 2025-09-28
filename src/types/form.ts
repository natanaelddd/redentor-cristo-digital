export type FieldType = 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'address' | 'cpf' | 'rg';

export interface FormField {
  id: string;
  field_type: FieldType;
  field_name: string;
  label: string;
  placeholder?: string;
  is_required: boolean;
  options: any[];
  validation_rules: any;
  order_position: number;
}

export interface EventForm {
  id: string;
  name: string;
  description: string;
  slug: string;
  banner_title: string;
  banner_description: string;
  page_title: string;
  page_description: string;
}

export interface FieldTypeConfig {
  type: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}