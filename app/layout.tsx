import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Бронирование столика",
  description: "Онлайн-бронирование столика в ресторане",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
