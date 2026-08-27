import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dogchoicehq.com"),
  title: {
    template: "%s | DogChoiceHQ",
    default: "DogChoiceHQ | Better choices for your best friend",
  },
  description:
    "Compare dog food, treats, supplements, and everyday essentials to make better choices for your dog.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "DogChoiceHQ",
    title: "DogChoiceHQ | Better choices for your best friend",
    description:
      "Compare dog products and understand the differences so you can choose with confidence.",
    url: "https://dogchoicehq.com",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
