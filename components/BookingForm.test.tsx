import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import BookingForm from "./BookingForm";
import { BOOKING_FORM } from "@/constants/booking";

describe("BookingForm отбражение элементов", () => {
  beforeEach(() => {
    render(<BookingForm />);
  });

  afterEach(() => {
    cleanup();
  });

  it("отображает заголовок формы", () => {
    expect.assertions(1);
    expect(
      screen.getByRole("heading", { name: BOOKING_FORM.title }),
    ).toBeInTheDocument();
  });

  it("отображает input для имени", () => {
    expect.assertions(1);
    expect(screen.getByLabelText(BOOKING_FORM.labelName)).toBeInTheDocument();
  });

  it("отображает input для телефона", () => {
    expect.assertions(1);
    expect(screen.getByLabelText(BOOKING_FORM.labelPhone)).toBeInTheDocument();
  });

  it("отображает input для даты", () => {
    expect.assertions(1);
    expect(screen.getByLabelText(BOOKING_FORM.labelDate)).toBeInTheDocument();
  });

  it("отображает select времени со слотами", () => {
    expect.assertions(4);
    const select = screen.getByLabelText(BOOKING_FORM.labelTime);
    expect(select).toBeInTheDocument();
    expect(select.tagName).toBe("SELECT");
    expect(
      screen.getByRole("option", { name: BOOKING_FORM.timeSlots[0] }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: BOOKING_FORM.timeSlots.at(-1) }),
    ).toBeInTheDocument();
  });

  it("отображает input для гостей со значением по умолчанию", () => {
    expect.assertions(2);
    const guests = screen.getByLabelText(
      BOOKING_FORM.labelGuests,
    ) as HTMLInputElement;
    expect(guests).toBeInTheDocument();
    expect(guests.value).toBe("1");
  });

  it("отображает кнопку отправки", () => {
    expect.assertions(1);
    expect(
      screen.getByRole("button", { name: BOOKING_FORM.buttonSubmit }),
    ).toBeInTheDocument();
  });
});
