"use client";

import { useState, useSyncExternalStore } from "react";

import type { BookingFormData } from "../types/booking";
import { BOOKING_FORM } from "../constants/booking";
import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
} from "../utils/validate";
import styles from "@/styles/BookingForm.module.css";

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
}

type Errors = Partial<Record<keyof BookingFormData, string>>;

const initialForm: BookingFormData = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: 1,
};

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const key = name as keyof BookingFormData;
    const nextValue = key === "guests" ? Number(value) : value;
    setForm((prev) => ({ ...prev, [key]: nextValue }));

    setErrors((prev) => {
      if (!prev[key]) return prev;
      const message = validators[key](nextValue);
      return { ...prev, [key]: message ?? undefined };
    });
  };

  const handleBlur = (field: keyof BookingFormData) => {
    const message = validators[field](form[field]);
    setErrors((prev) => ({ ...prev, [field]: message ?? undefined }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateAll(form);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (!hasErrors) {
      onSubmit(form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md w-full mx-auto p-6"
    >
      <h1 className="text-2xl font-semibold text-center mb-2">
        {BOOKING_FORM.title}
      </h1>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          {BOOKING_FORM.labelName}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
        />
        <div className={styles.errorMessage}>
          <span
            className={`${styles.errorText} ${errors.name ? styles.visible : ""}`}
            aria-hidden={!errors.name}
          >
            {errors.name ?? ""}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium">
          {BOOKING_FORM.labelPhone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          onBlur={() => handleBlur("phone")}
          placeholder={BOOKING_FORM.placeholderPhone}
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
        />
        <div className={styles.errorMessage}>
          <span
            className={`${styles.errorText} ${errors.phone ? styles.visible : ""}`}
            aria-hidden={!errors.phone}
          >
            {errors.phone ?? ""}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-medium">
          {BOOKING_FORM.labelDate}
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          onBlur={() => handleBlur("date")}
          className={`${styles.input} ${errors.date ? styles.inputError : ""}`}
        />
        <div className={styles.errorMessage}>
          <span
            className={`${styles.errorText} ${errors.date ? styles.visible : ""}`}
            aria-hidden={!errors.date}
          >
            {errors.date ?? ""}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="time" className="text-sm font-medium">
          {BOOKING_FORM.labelTime}
        </label>
        <select
          id="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          onBlur={() => handleBlur("time")}
          className={`${styles.input} ${styles.select} ${errors.time ? styles.inputError : ""}`}
        >
          <option value="">{BOOKING_FORM.optionPlaceholder}</option>
          {BOOKING_FORM.timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <div className={styles.errorMessage}>
          <span
            className={`${styles.errorText} ${errors.time ? styles.visible : ""}`}
            aria-hidden={!errors.time}
          >
            {errors.time ?? ""}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="guests" className="text-sm font-medium">
          {BOOKING_FORM.labelGuests}
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          onBlur={() => handleBlur("guests")}
          min={1}
          max={12}
          className={`${styles.input} ${errors.guests ? styles.inputError : ""}`}
        />
        <div className={styles.errorMessage}>
          <span
            className={`${styles.errorText} ${errors.guests ? styles.visible : ""}`}
            aria-hidden={!errors.guests}
          >
            {errors.guests ?? ""}
          </span>
        </div>
      </div>

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

const validators: Record<
  keyof BookingFormData,
  (value: BookingFormData[keyof BookingFormData]) => string | null
> = {
  name: (v) => validateName(v as string),
  phone: (v) => validatePhone(v as string),
  date: (v) => validateDate(v as string),
  time: (v) => validateTime(v as string),
  guests: (v) => validateGuests(v as number),
};

function validateAll(form: BookingFormData): Errors {
  return {
    name: validateName(form.name) ?? undefined,
    phone: validatePhone(form.phone) ?? undefined,
    date: validateDate(form.date) ?? undefined,
    time: validateTime(form.time) ?? undefined,
    guests: validateGuests(form.guests) ?? undefined,
  };
}
