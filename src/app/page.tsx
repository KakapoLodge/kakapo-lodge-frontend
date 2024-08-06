"use client";
import Image from "next/image";
import PageContent from "./ui/PageContent";

const Home = () => {
  return (
    <PageContent>
      <MainBanner />
    </PageContent>
  );
}

export default Home;

const MainBanner = () => {
  return (
    <Image
      src="/landing_page/main_banner.png"
      alt="Main Banner"
      width={1621}
      height={855}
      style={{ width: "100%", height: "auto" }}
      priority
    />
  );
};
