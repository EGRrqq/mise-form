import { BOOKING_FORM, VALIDATION_MESSAGES } from "../constants/booking";
import { getAvailableTimeSlots } from "./timeSlots";

export function validateName(value: string): string | null {
  if (!value.trim()) {
    return VALIDATION_MESSAGES.nameRequired;
  }
  if (value.trim().length < 2) {
    return VALIDATION_MESSAGES.nameMinLength;
  }
  return null;
}

export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
    return null;
  }
  return VALIDATION_MESSAGES.phoneFormat;
}

export function validateDate(value: string): string | null {
  if (!value) {
    return VALIDATION_MESSAGES.dateRequired;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(value);
  if (selected < today) {
    return VALIDATION_MESSAGES.datePast;
  }
  return null;
}

export function validateTime(value: string): string | null {
  if (!value) {
    return VALIDATION_MESSAGES.timeRequired;
  }
  if (
    !BOOKING_FORM.timeSlots.includes(
      value as (typeof BOOKING_FORM.timeSlots)[number],
    )
  ) {
    return VALIDATION_MESSAGES.timeInvalid;
  }
  return null;
}

export function validateDateWithAvailability(
  value: string,
  now: Date = new Date(),
): string | null {
  const base = validateDate(value);
  if (base) {
    return base;
  }
  if (getAvailableTimeSlots(value, now).length === 0) {
    return VALIDATION_MESSAGES.dateNoSlots;
  }
  return null;
}

export function validateGuests(value: number): string | null {
  if (!Number.isFinite(value)) {
    return VALIDATION_MESSAGES.guestsRequired;
  }
  if (value < 1 || value > 12) {
    return VALIDATION_MESSAGES.guestsRange;
  }
  return null;
}
