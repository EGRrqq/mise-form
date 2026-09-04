import type { ReactNode } from "react";
import styles from "@/styles/ConfirmationScreen.module.css";

interface SummaryRowProps {
  label: string;
  children: ReactNode;
}

export default function SummaryRow({ label, children }: SummaryRowProps) {
  return (
    <div className={styles.row}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{children}</dd>
    </div>
  );
}
