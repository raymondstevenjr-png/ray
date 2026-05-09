import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaloneSeva — Your business never misses a call again",
  description:
    "SaloneSeva is an AI receptionist built for Sierra Leonean business owners in the US. It answers every call, books appointments, and notifies you instantly.",
  keywords: [
    "AI receptionist",
    "Sierra Leonean business",
    "appointment booking",
    "missed calls",
    "small business",
  ],
  openGraph: {
    title: "SaloneSeva — Your business never misses a call again",
    description:
      "AI-powered phone receptionist for Sierra Leonean small business owners in the US.",
    type: "website",
    siteName: "SaloneSeva",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
