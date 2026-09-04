import type { ReactNode } from "react";

import styles from "@/styles/BookingForm.module.css";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  error?: string | null;
  children: ReactNode;
}

export default function FormField({
  htmlFor,
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <div className={styles.errorMessage} aria-hidden={!error}>
        <span className={`${styles.errorText} ${error ? styles.visible : ""}`}>
          {error ?? ""}
        </span>
      </div>
    </div>
  );
}
