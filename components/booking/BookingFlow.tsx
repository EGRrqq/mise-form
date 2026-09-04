"use client";

import BookingForm from "./BookingForm";
import ConfirmationScreen from "./ConfirmationScreen";
import { useBookingFlow } from "@/hooks/useBookingFlow";

export default function BookingFlow() {
  const { status, confirmed, submit, reset } = useBookingFlow();

  if (status === "success" && confirmed) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <ConfirmationScreen data={confirmed} onReset={reset} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <BookingForm onSubmit={submit} loading={status === "loading"} />
    </div>
  );
}
