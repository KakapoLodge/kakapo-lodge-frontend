import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import {
  GOOGLE_ANALYTICS_ID,
  KAKAPO_LODGE_DESCRIPTION,
  KAKAPO_LODGE_NAME,
} from "./content";
import "./globals.css";
import StoreProvider from "./lib/StoreProvider";
import StyledComponentsRegistry from "./lib/StyledComponentsRegistry";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: KAKAPO_LODGE_NAME,
  description: KAKAPO_LODGE_DESCRIPTION,
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={font.className}>
        <StyledComponentsRegistry>
          <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </html>
  );
};

export default RootLayout;
