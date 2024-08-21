import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import StoreProvider from "./lib/StoreProvider";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";

const nunito = Nunito({ subsets: ["latin"] });

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
      <body className={nunito.className}>
        <StyledComponentsRegistry>
          <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId="G-Q6FH3J5ZQM" />
    </html>
  );
}
