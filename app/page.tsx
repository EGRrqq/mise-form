"use client";

import { useCallback, useState } from "react";

import BookingForm from "@/components/booking/BookingForm";
import ConfirmationScreen from "@/components/booking/ConfirmationScreen";
import type { BookingFormData, BookingStatus } from "@/types/booking";

const SUBMIT_DELAY_MS = 1500;

export default function Home() {
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [confirmed, setConfirmed] = useState<BookingFormData | null>(null);

  const handleSubmit = useCallback((data: BookingFormData) => {
    setConfirmed(data);
    setStatus("loading");
    setTimeout(() => setStatus("success"), SUBMIT_DELAY_MS);
  }, []);

  const handleReset = useCallback(() => {
    setStatus("idle");
    setConfirmed(null);
  }, []);

  if (status === "success" && confirmed) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <ConfirmationScreen data={confirmed} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <BookingForm onSubmit={handleSubmit} loading={status === "loading"} />
    </div>
  );
}
