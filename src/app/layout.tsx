import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BillingProvider } from "@/context/BillingContext";
import Navbar from "./components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechBilling",
  description: "Sistema de faturação com Next.js",
};

/**
 * RootLayout component - defines the overall HTML structure of the app
 *
 * This layout wraps the entire application and provides:
 * - HTML language attribute and global font variables for Geist fonts
 * - Global styles via globals.css
 * - Billing context provider for state management related to billing data
 * - Navbar component that appears on every page
 * - A main container to render page content with padding and max width
 *
 * @param {object} props - The React props
 * @param {React.ReactNode} props.children - The content to render inside the layout
 * @returns {JSX.Element} The root HTML layout for the application
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Wrap app in BillingProvider to supply billing-related context */}
        <BillingProvider>
          {/* Site-wide navigation bar */}
          <Navbar />
          {/* Main content container with padding and max width */}
          <main className="p-4 max-w-7xl mx-auto">{children}</main>
        </BillingProvider>
      </body>
    </html>
  );
}
