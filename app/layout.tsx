import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carthaginian-Shekel-3D-Viewer",
  description: "Interactive 3D viewer of the Carthaginian shekel coin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
