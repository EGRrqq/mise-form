import { BOOKING_FORM } from "../constants/booking";

export function isSameDay(dateIso: string, now: Date = new Date()): boolean {
  const d = new Date(dateIso);
  return (
    !Number.isNaN(d.getTime()) &&
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function getAvailableTimeSlots(
  date: string,
  now: Date = new Date(),
): string[] {
  const all = [...BOOKING_FORM.timeSlots];
  if (!isSameDay(date, now)) {
    return all;
  }
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return all.filter((slot) => {
    const [h, m] = slot.split(":").map(Number);
    return h * 60 + m > nowMinutes;
  });
}
