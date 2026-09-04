import type { BookingFormData } from "../types/booking";
import { CONFIRMATION } from "../constants/booking";

interface ConfirmationScreenProps {
  data: BookingFormData;
  onReset: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export default function ConfirmationScreen({
  data,
  onReset,
}: ConfirmationScreenProps) {
  return (
    <div className="flex flex-col gap-6 max-w-md w-full mx-auto p-6 text-center">
      <h1 className="text-2xl font-semibold">{CONFIRMATION.title}</h1>

      <dl className="flex flex-col gap-3 text-left">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">
            {CONFIRMATION.labelName}
          </dt>
          <dd>{data.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">
            {CONFIRMATION.labelDate}
          </dt>
          <dd>{formatDate(data.date)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">
            {CONFIRMATION.labelTime}
          </dt>
          <dd>{data.time}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">
            {CONFIRMATION.labelGuests}
          </dt>
          <dd>{data.guests}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onReset}
        className="bg-amber-700 text-white rounded py-2.5 font-medium hover:bg-amber-800 transition-colors"
      >
        {CONFIRMATION.buttonAnother}
      </button>
    </div>
  );
}
