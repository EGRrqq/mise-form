"use client";

import { useCallback, useState } from "react";

import type { BookingFormData, BookingStatus } from "../types/booking";

const SUBMIT_DELAY_MS = 1500;

export function useBookingFlow() {
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [confirmed, setConfirmed] = useState<BookingFormData | null>(null);

  const submit = useCallback((data: BookingFormData) => {
    setConfirmed(data);
    setStatus("loading");
    setTimeout(() => setStatus("success"), SUBMIT_DELAY_MS);
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setConfirmed(null);
  }, []);

  return { status, confirmed, submit, reset };
}
