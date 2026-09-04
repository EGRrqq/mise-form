"use client";

import { useCallback, useState } from "react";

import type { BookingFormData } from "../types/booking";
import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
} from "../utils/validate";

type Errors = Partial<Record<keyof BookingFormData, string>>;

const initialForm: BookingFormData = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: 1,
};

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

function parseValue(key: keyof BookingFormData, value: string) {
  return key === "guests" ? Number(value) : value;
}

export function useBookingForm(onSubmit: (data: BookingFormData) => void) {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const key = name as keyof BookingFormData;
      const nextValue = parseValue(key, value);
      setForm((prev) => ({ ...prev, [key]: nextValue }));

      setErrors((prev) => {
        if (!prev[key]) return prev;
        const message = validators[key](nextValue);
        return { ...prev, [key]: message ?? undefined };
      });
    },
    [],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const key = name as keyof BookingFormData;
      const nextValue = parseValue(key, value);
      const message = validators[key](nextValue);
      setErrors((prev) => ({ ...prev, [key]: message ?? undefined }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newErrors = validateAll(form);
      setErrors(newErrors);

      const hasErrors = Object.values(newErrors).some(Boolean);
      if (!hasErrors) {
        onSubmit(form);
      }
    },
    [form, onSubmit],
  );

  return { form, errors, handleChange, handleBlur, handleSubmit };
}
