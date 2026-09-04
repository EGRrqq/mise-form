"use client";

import { useSyncExternalStore } from "react";

import type { BookingFormData } from "@/types/booking";
import { BOOKING_FORM } from "@/constants/booking";
import { useBookingForm } from "@/hooks/useBookingForm";
import FormField from "./FormField";
import styles from "@/styles/BookingForm.module.css";

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const { form, errors, handleChange, handleBlur, handleSubmit } =
    useBookingForm(onSubmit);

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md w-full mx-auto p-6"
    >
      <h1 className="text-2xl font-semibold text-center mb-2">
        {BOOKING_FORM.title}
      </h1>

      <FormField
        htmlFor="name"
        label={BOOKING_FORM.labelName}
        error={errors.name}
      >
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        />
      </FormField>

      <FormField
        htmlFor="phone"
        label={BOOKING_FORM.labelPhone}
        error={errors.phone}
      >
        <input
          type="tel"
          id="phone"
          name="phone"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={BOOKING_FORM.placeholderPhone}
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
        />
      </FormField>

      <FormField
        htmlFor="date"
        label={BOOKING_FORM.labelDate}
        error={errors.date}
      >
        <input
          type="date"
          id="date"
          name="date"
          autoComplete="off"
          value={form.date}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
        />
      </FormField>

      <FormField
        htmlFor="time"
        label={BOOKING_FORM.labelTime}
        error={errors.time}
      >
        <select
          id="time"
          name="time"
          autoComplete="off"
          value={form.time}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${styles.input} ${styles.select} ${errors.time ? styles.inputError : ""}`}
        >
          <option value="">{BOOKING_FORM.optionPlaceholder}</option>
          {BOOKING_FORM.timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        htmlFor="guests"
        label={BOOKING_FORM.labelGuests}
        error={errors.guests}
      >
        <input
          type="number"
          id="guests"
          name="guests"
          autoComplete="off"
          value={form.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          min={1}
          max={12}
          className={`${styles.input} ${errors.guests ? styles.inputError : ""}`}
        />
      </FormField>

      <button
        type="submit"
        disabled={!hydrated}
        className="bg-amber-700 text-white rounded py-2.5 mt-2 font-medium hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-700"
      >
        {BOOKING_FORM.buttonSubmit}
      </button>
    </form>
  );
}
