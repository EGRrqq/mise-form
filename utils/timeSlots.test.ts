import { describe, it, expect } from "vitest";
import { getAvailableTimeSlots, isSameDay } from "./timeSlots";
import { BOOKING_FORM } from "../constants/booking";

const all = BOOKING_FORM.timeSlots;

describe("getAvailableTimeSlots", () => {
  it("возвращает все слоты для будущей даты независимо от времени", () => {
    expect.assertions(1);
    const now = new Date("2026-09-04T23:00:00");
    const future = "2026-09-10";
    expect(getAvailableTimeSlots(future, now)).toEqual([...all]);
  });

  it("возвращает только слоты позже текущего времени для сегодняшней даты", () => {
    expect.assertions(1);
    const now = new Date("2026-09-04T14:30:00");
    const today = "2026-09-04";
    expect(getAvailableTimeSlots(today, now)).toEqual([
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]);
  });

  it("отбрасывает слот, равный текущему времени (не наступил)", () => {
    expect.assertions(1);
    const now = new Date("2026-09-04T15:00:00");
    const today = "2026-09-04";
    const result = getAvailableTimeSlots(today, now);
    expect(result.includes("15:00")).toBe(false);
  });

  it("возвращает пустой массив, если на сегодня слоты закончились", () => {
    expect.assertions(1);
    const now = new Date("2026-09-04T22:30:00");
    const today = "2026-09-04";
    expect(getAvailableTimeSlots(today, now)).toEqual([]);
  });
});

describe("isSameDay", () => {
  it("true для одной и той же даты", () => {
    expect.assertions(1);
    expect(isSameDay("2026-09-04", new Date("2026-09-04T10:00:00"))).toBe(true);
  });

  it("false для разных дат", () => {
    expect.assertions(1);
    expect(isSameDay("2026-09-05", new Date("2026-09-04T10:00:00"))).toBe(
      false,
    );
  });
});
