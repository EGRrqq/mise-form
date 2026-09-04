"use client";

import BookingForm from "./BookingForm";
import ConfirmationScreen from "./ConfirmationScreen";
import { useBookingFlow } from "@/hooks/useBookingFlow";
import styles from "@/styles/flow.module.css";

export default function BookingFlow() {
  const { status, confirmed, submit, reset } = useBookingFlow();
  const isSuccess = status === "success" && confirmed;

  return (
    <div
      key={isSuccess ? "confirmation" : "form"}
      className={`${styles.layout} ${styles.enter}`}
    >
      {isSuccess ? (
        <ConfirmationScreen data={confirmed} onReset={reset} />
      ) : (
        <BookingForm onSubmit={submit} loading={status === "loading"} />
      )}
    </div>
  );
}
