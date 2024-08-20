import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./lib/StoreProvider";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kakapo Lodge",
  description: "Hanmer Springs Backpacker Accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId="G-Q6FH3J5ZQM" />
    </html>
  );
}
