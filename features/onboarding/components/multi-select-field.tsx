"use client";

import { MultiSelect } from "@/components/multi-select";
import { FormFieldWrapper } from "./form-field-wrapper";

interface MultiSelectFieldProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: Array<{ value: string }>;
  onChange(value: Array<{ value: string }>): void;
  placeholder: string;
  error?: string;
}

export function MultiSelectField({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
}: MultiSelectFieldProps) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <MultiSelect
        className="bg-input/30 hover:bg-input/50"
        options={options}
        onValueChange={(selectedValues) => {
          const mapped = selectedValues.map((val) => ({ value: val }));
          onChange(mapped);
        }}
        value={value.map((item) => item.value)}
        placeholder={placeholder}
        variant="inverted"
        maxCount={options.length}
      />
    </FormFieldWrapper>
  );
}
