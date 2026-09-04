import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import BookingFlow from "./BookingFlow";
import { BOOKING_FORM, CONFIRMATION } from "@/constants/booking";

function futureDateIso(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(BOOKING_FORM.labelName), {
    target: { value: "Иван" },
  });
  fireEvent.change(screen.getByLabelText(BOOKING_FORM.labelPhone), {
    target: { value: "+7 (999) 123-45-67" },
  });
  fireEvent.change(screen.getByLabelText(BOOKING_FORM.labelDate), {
    target: { value: futureDateIso() },
  });
  fireEvent.change(screen.getByLabelText(BOOKING_FORM.labelTime), {
    target: { value: BOOKING_FORM.timeSlots[0] },
  });
  fireEvent.change(screen.getByLabelText(BOOKING_FORM.labelGuests), {
    target: { value: "4" },
  });
}

describe("Интеграция: форма → подтверждение", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("показывает лоадер после сабмита, затем экран подтверждения", () => {
    expect.assertions(5);

    render(<BookingFlow />);
    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", { name: BOOKING_FORM.buttonSubmit }),
    );

    expect(screen.getByText(BOOKING_FORM.buttonLoading)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Бронируем/i })).toBeDisabled();

    act(() => vi.advanceTimersByTime(1500));

    expect(
      screen.getByRole("heading", { name: CONFIRMATION.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("Иван")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("кнопка 'Забронировать ещё' возвращает к пустой форме", () => {
    expect.assertions(4);

    render(<BookingFlow />);
    fillValidForm();

    fireEvent.click(
      screen.getByRole("button", { name: BOOKING_FORM.buttonSubmit }),
    );
    act(() => vi.advanceTimersByTime(1500));

    fireEvent.click(
      screen.getByRole("button", { name: CONFIRMATION.buttonAnother }),
    );

    expect(
      screen.getByRole("button", { name: BOOKING_FORM.buttonSubmit }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(BOOKING_FORM.labelName)).toHaveValue("");
    expect(screen.getByLabelText(BOOKING_FORM.labelPhone)).toHaveValue("");
    expect(screen.getByLabelText(BOOKING_FORM.labelGuests)).toHaveValue(1);
  });
});
