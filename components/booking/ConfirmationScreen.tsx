import type { BookingFormData } from "@/types/booking";
import { CONFIRMATION } from "@/constants/booking";
import SummaryRow from "./SummaryRow";
import styles from "@/styles/ConfirmationScreen.module.css";

interface ConfirmationScreenProps {
  data: BookingFormData;
  onReset: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export default function ConfirmationScreen({
  data,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{CONFIRMATION.title}</h1>

      <dl className={styles.summary}>
        <SummaryRow label={CONFIRMATION.labelName}>{data.name}</SummaryRow>
        <SummaryRow label={CONFIRMATION.labelDate}>
          {formatDate(data.date)}
        </SummaryRow>
        <SummaryRow label={CONFIRMATION.labelTime}>{data.time}</SummaryRow>
        <SummaryRow label={CONFIRMATION.labelGuests}>{data.guests}</SummaryRow>
      </dl>

      <button type="button" onClick={onReset} className={styles.button}>
        {CONFIRMATION.buttonAnother}
      </button>
    </div>
  );
}
