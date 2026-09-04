export const VALIDATION_MESSAGES = {
  nameRequired: "Имя обязательно",
  nameMinLength: "Имя должно содержать минимум 2 символа",
  phoneFormat: "Введите номер в формате +7XXXXXXXXXX",
  dateRequired: "Дата обязательна",
  datePast: "Дата не может быть раньше сегодняшнего дня",
  dateNoSlots:
    "На сегодня больше нет свободного времени. Попробуйте выбрать другой день",
  timeRequired: "Выберите время",
  timeInvalid: "Выберите доступный слот времени",
  guestsRequired: "Количество гостей обязательно",
  guestsRange: "Количество гостей должно быть от 1 до 12",
} as const;

export const BOOKING_FORM = {
  title: "Бронирование столика",
  labelName: "Имя гостя",
  labelPhone: "Телефон",
  labelDate: "Дата",
  labelTime: "Время",
  labelGuests: "Количество гостей",
  placeholderPhone: "+7 (999) 123-45-67",
  optionPlaceholder: "Выберите время",
  buttonSubmit: "Забронировать",
  buttonLoading: "Бронируем…",
  timeSlots: [
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ],
} as const;

export const CONFIRMATION = {
  title: "Бронирование подтверждено",
  labelName: "Имя",
  labelDate: "Дата",
  labelTime: "Время",
  labelGuests: "Гости",
  buttonAnother: "Забронировать ещё",
} as const;
