"use client";

import { useState } from "react";

import type { BookingFormData } from "../types/booking";
import { BOOKING_FORM } from "../constants/booking";
import styles from "@/styles/BookingForm.module.css";

export default function BookingForm() {
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingFormData, string>>
  >({});

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log({
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      guests: Number(formData.get("guests")),
    });
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
          required
          className={styles.input}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium">
          {BOOKING_FORM.labelPhone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder={BOOKING_FORM.placeholderPhone}
          className={styles.input}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm font-medium">
          {BOOKING_FORM.labelDate}
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          className={styles.input}
        />
        {errors.date && (
          <span className="text-red-500 text-sm">{errors.date}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="time" className="text-sm font-medium">
          {BOOKING_FORM.labelTime}
        </label>
        <select
          id="time"
          name="time"
          required
          className={`${styles.input} ${styles.select}`}
        >
          <option value="">{BOOKING_FORM.optionPlaceholder}</option>
          {BOOKING_FORM.timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        {errors.time && (
          <span className="text-red-500 text-sm">{errors.time}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="guests" className="text-sm font-medium">
          {BOOKING_FORM.labelGuests}
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          required
          min={1}
          max={12}
          defaultValue={1}
          className={styles.input}
        />
        {errors.guests && (
          <span className="text-red-500 text-sm">{errors.guests}</span>
        )}
      </div>

      <button
        type="submit"
        className="bg-amber-700 text-white rounded py-2.5 mt-2 font-medium hover:bg-amber-800 transition-colors"
      >
        {BOOKING_FORM.buttonSubmit}
      </button>
    </form>
  );
}
