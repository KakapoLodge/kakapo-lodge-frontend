import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { WEBSITE_DESCRIPTION, WEBSITE_TITLE } from "./content";
import "./globals.css";
import StoreProvider from "./lib/StoreProvider";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: WEBSITE_TITLE,
  description: WEBSITE_DESCRIPTION,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>
          <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId="G-Q6FH3J5ZQM" />
    </html>
  );
};

export default RootLayout;
