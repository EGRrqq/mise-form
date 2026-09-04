import { describe, it, expect } from "vitest";
import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
} from "./validate";
import { BOOKING_FORM, VALIDATION_MESSAGES } from "../constants/booking";

describe("validateName", () => {
  it("пустая строка → обязательное поле", () => {
    expect.assertions(1);
    expect(validateName("")).toBe(VALIDATION_MESSAGES.nameRequired);
  });

  it("один символ → минимальная длина", () => {
    expect.assertions(1);
    expect(validateName("И")).toBe(VALIDATION_MESSAGES.nameMinLength);
  });

  it("корректное имя → null", () => {
    expect.assertions(1);
    expect(validateName("Иван")).toBeNull();
  });
});

describe("validatePhone", () => {
  it("формат +7 со спецсимволами → null", () => {
    expect.assertions(1);
    expect(validatePhone("+7 (999) 123-45-67")).toBeNull();
  });

  it("формат 8 без разделителей → null", () => {
    expect.assertions(1);
    expect(validatePhone("89161234567")).toBeNull();
  });

  it("неверное количество цифр → ошибка", () => {
    expect.assertions(1);
    expect(validatePhone("12345")).toBe(VALIDATION_MESSAGES.phoneFormat);
  });

  it("пустая строка → ошибка формата", () => {
    expect.assertions(1);
    expect(validatePhone("")).toBe(VALIDATION_MESSAGES.phoneFormat);
  });
});

describe("validateDate", () => {
  it("пустая дата → обязательное поле", () => {
    expect.assertions(1);
    expect(validateDate("")).toBe(VALIDATION_MESSAGES.dateRequired);
  });

  it("дата раньше сегодня → ошибка", () => {
    expect.assertions(1);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const iso = yesterday.toISOString().slice(0, 10);
    expect(validateDate(iso)).toBe(VALIDATION_MESSAGES.datePast);
  });

  it("сегодняшняя дата → null", () => {
    expect.assertions(1);
    const today = new Date().toISOString().slice(0, 10);
    expect(validateDate(today)).toBeNull();
  });

  it("будущая дата → null", () => {
    expect.assertions(1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const iso = tomorrow.toISOString().slice(0, 10);
    expect(validateDate(iso)).toBeNull();
  });
});

describe("validateTime", () => {
  it("пустое время → обязательное поле", () => {
    expect.assertions(1);
    expect(validateTime("")).toBe(VALIDATION_MESSAGES.timeRequired);
  });

  it("валидный слот → null", () => {
    expect.assertions(1);
    expect(validateTime(BOOKING_FORM.timeSlots[0])).toBeNull();
  });

  it("невалидный слот → ошибка", () => {
    expect.assertions(1);
    expect(validateTime("23:00")).toBe(VALIDATION_MESSAGES.timeInvalid);
  });
});

describe("validateGuests", () => {
  it("NaN → обязательное поле", () => {
    expect.assertions(1);
    expect(validateGuests(NaN)).toBe(VALIDATION_MESSAGES.guestsRequired);
  });

  it("0 → вне диапазона", () => {
    expect.assertions(1);
    expect(validateGuests(0)).toBe(VALIDATION_MESSAGES.guestsRange);
  });

  it("1 → корректно", () => {
    expect.assertions(1);
    expect(validateGuests(1)).toBeNull();
  });

  it("12 → корректно", () => {
    expect.assertions(1);
    expect(validateGuests(12)).toBeNull();
  });

  it("13 → вне диапазона", () => {
    expect.assertions(1);
    expect(validateGuests(13)).toBe(VALIDATION_MESSAGES.guestsRange);
  });
});
