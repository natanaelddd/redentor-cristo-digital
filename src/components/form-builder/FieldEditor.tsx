import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FieldEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  htmlFor?: string;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  label,
  value,
  onChange,
  placeholder,
  htmlFor
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input
        id={htmlFor}
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};