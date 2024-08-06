"use client";
import Image from "next/image";
import PageContent from "./ui/PageContent";

const LandingPage = () => {
  return (
    <PageContent>
      <MainBanner />
    </PageContent>
  );
}

export default LandingPage;

const MainBanner = () => {
  return (
    <Image
      src="/landing_page/banner.png"
      alt="Main Banner"
      width={1621}
      height={855}
      style={{ width: "100%", height: "auto" }}
      priority
    />
  );
};
