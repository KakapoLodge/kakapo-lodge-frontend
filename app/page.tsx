"use client";

import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "./lib/context";
import { useIsMobile } from "./lib/hooks";
import { IsMobileProps } from "./lib/types";
import PageContent from "./ui/PageContent";
import { INTRODUCTION } from "./content";

const LandingPage = () => {
  const isMobile = useIsMobile();

  const { title, paragraphs } = INTRODUCTION;

  return (
    <IsMobileContext.Provider value={isMobile}>
      <LandingPageContent>
        <MainBanner />

        <Introduction>
          <IntroductionTitle>{title}</IntroductionTitle>

          {paragraphs.map((paragraph, index) => (
            <p key={`introduction-paragraph-${index}`}>{paragraph}</p>
          ))}
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
    <_LandingPageContent $isMobile={isMobile}>{children}</_LandingPageContent>
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

  return <_Introduction $isMobile={isMobile}>{children}</_Introduction>;
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
    <_IntroductionTitle $isMobile={isMobile}>{children}</_IntroductionTitle>
  );
};

const _IntroductionTitle = styled.h1<IsMobileProps>`
  text-align: center;
  font-size: ${(props) => (props.$isMobile ? "x-large" : "xx-large")};
  font-weight: 500;
`;
