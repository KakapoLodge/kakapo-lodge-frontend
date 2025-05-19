import StoreProvider from "@/app/.lib/StoreProvider";
import StyledComponentsRegistry from "@/app/.lib/StyledComponentsRegistry";
import {
  GOOGLE_ANALYTICS_ID,
  KAKAPO_LODGE_DESCRIPTION,
  KAKAPO_LODGE_NAME,
} from "@/app/content";
import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${KAKAPO_LODGE_NAME}`,
    default: KAKAPO_LODGE_NAME,
  },
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
