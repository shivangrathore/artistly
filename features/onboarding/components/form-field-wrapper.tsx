import type React from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

interface FormFieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function FormFieldWrapper({
  label,
  error,
  children,
}: FormFieldWrapperProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </FormItem>
  );
}
