"use client";

import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "./lib/context";
import { useIsMobile } from "./lib/hooks";
import { IsMobileProps } from "./lib/types";
import PageContent from "./ui/PageContent";

const LandingPage = () => {
  const isMobile = useIsMobile();

  return (
    <IsMobileContext.Provider value={isMobile}>
      <LandingPageContent>
        <MainBanner />

        <Introduction>
          <IntroductionTitle>Welcome to Kakapo Lodge</IntroductionTitle>

          <p>
            The two-story purpose-built backpacker hostel features modern rooms,
            an open lounge with warm fireplace, and a relaxed, friendly
            atmosphere. Enjoy our spacious, well-appointed backpacker
            accommodation, Netflix, fast unlimited WiFi, large kitchen, outdoor
            courtyard with views of the Southern Alps.
          </p>

          <p>
            Just three minutes' walk from the town's main attraction, Hanmer
            Springs Thermal Pools and Spa, and a pleasant stroll to numerous
            restaurants and stores, our hostel is a great base to enjoy your
            relaxing Hanmer getaway.
          </p>

          <p>
            All ensuite accommodation has free towels as well as free soap and
            shampoo.
          </p>
        </Introduction>
      </LandingPageContent>
    </IsMobileContext.Provider>
  );
};

export default LandingPage;

const LandingPageContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);

  return (
    <_LandingPageContent $isMobile={isMobile}>
      {children}
    </_LandingPageContent>
  );
};

const _LandingPageContent = styled(PageContent)<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "16px" : "24px")};
`;

const MainBanner = () => {
  return (
    <BannerImage
      src="/landing_page/banner.png"
      alt="Main Banner"
      width={1621}
      height={855}
      priority
    />
  );
};

const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const Introduction = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);

  return (
    <_Introduction $isMobile={isMobile}>{children}</_Introduction>
  );
};

const _Introduction = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: ${(props) => (props.$isMobile ? "0px 32px" : "0px 16vw")};
`;

const IntroductionTitle = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);

  return (
    <_IntroductionTitle $isMobile={isMobile}>
      {children}
    </_IntroductionTitle>
  );
};

const _IntroductionTitle = styled.h1<IsMobileProps>`
  text-align: center;
  font-size: ${(props) => (props.$isMobile ? "x-large" : "xx-large")};
  font-weight: 500;
`;
