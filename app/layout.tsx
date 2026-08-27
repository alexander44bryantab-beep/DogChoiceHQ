import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DogChoiceHQ | Better choices for your best friend",
  description: "Compare dog food, treats, supplements, and everyday essentials to make better choices for your dog.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
