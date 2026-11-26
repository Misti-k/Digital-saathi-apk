import type { Metadata, Viewport } from "next";
import { UserDataProvider } from "@/context/UserDataContext";
import { PreferencesProvider } from "@/context/PreferencesContext";
import "./globals.css";
import "./features.css";

export const metadata: Metadata = {
  title: "Digital Saathi | Digital Literacy for Senior Citizens",
  description:
    "Learn to use your phone, explore the internet, and stay safe online with simple step-by-step lessons.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          <PreferencesProvider>{children}</PreferencesProvider>
        </UserDataProvider>
      </body>
    </html>
  );
}
