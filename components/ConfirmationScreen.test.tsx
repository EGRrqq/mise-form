import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ConfirmationScreen from "./ConfirmationScreen";
import { CONFIRMATION } from "../constants/booking";
import type { BookingFormData } from "../types/booking";

const mockData: BookingFormData = {
  name: "Иван",
  phone: "+7 (999) 123-45-67",
  date: "2026-09-10",
  time: "19:00",
  guests: 4,
};

describe("ConfirmationScreen отображение", () => {
  const onReset = vi.fn();
  const dateText = new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(mockData.date));

  beforeEach(() => {
    render(<ConfirmationScreen data={mockData} onReset={onReset} />);
  });

  afterEach(() => {
    cleanup();
  });

  it("отображает заголовок подтверждения", () => {
    expect.assertions(1);
    expect(
      screen.getByRole("heading", { name: CONFIRMATION.title }),
    ).toBeInTheDocument();
  });

  it("отображает имя гостя", () => {
    expect.assertions(1);
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
  });

  it("отображает дату в человекочитаемом формате", () => {
    expect.assertions(1);
    expect(screen.getByText(dateText)).toBeInTheDocument();
  });

  it("отображает время", () => {
    expect.assertions(1);
    expect(screen.getByText(mockData.time)).toBeInTheDocument();
  });

  it("отображает количество гостей", () => {
    expect.assertions(1);
    expect(screen.getByText(String(mockData.guests))).toBeInTheDocument();
  });

  it("отображает кнопку 'Забронировать ещё'", () => {
    expect.assertions(1);
    expect(
      screen.getByRole("button", { name: CONFIRMATION.buttonAnother }),
    ).toBeInTheDocument();
  });

  it("клик по кнопке вызывает onReset", () => {
    expect.assertions(1);
    fireEvent.click(
      screen.getByRole("button", { name: CONFIRMATION.buttonAnother }),
    );
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
