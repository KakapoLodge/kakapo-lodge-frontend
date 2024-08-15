"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext } from "react";
import styled from "styled-components";
import {
  ACCOMMODATION_IMAGE_PATHS,
  ACCOMMODATION_NAMES,
  ACCOMMODATION_NAME_IDS,
} from "./accommodation/content";
import { AccommodationNameId } from "./accommodation/types";
import { INTRODUCTION } from "./content";
import { IsMobileContext } from "./lib/context";
import { useIsMobile } from "./lib/hooks";
import { IsMobileProps } from "./lib/types";
import CarouselImage from "./ui/CarouselImage";
import CustomCarousel from "./ui/CustomCarousel";
import CustomLink from "./ui/CustomLink";
import Header from "./ui/Header";
import PageContent from "./ui/PageContent";
import PageTitle from "./ui/PageTitle";
import Section from "./ui/Section";

const LandingPage = () => {
  const isMobile = useIsMobile();

  const { title, paragraphs } = INTRODUCTION;

  return (
    <IsMobileContext.Provider value={isMobile}>
      <LandingPageContent>
        <MainBanner />

        <PageTitle text={title} />
        <Introduction>
          {paragraphs.map((paragraph, index) => (
            <p key={`introduction-paragraph-${index}`}>{paragraph}</p>
          ))}
        </Introduction>
        <br />
        <AccommodationShortcuts />
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

const AccommodationShortcuts = () => {
  return (
    <Section>
      <Header text="Our Accommodation" center={true} />

      <CustomCarousel>
        {ACCOMMODATION_NAME_IDS.map((nameId) => (
          <AccommodationShortcut key={nameId} nameId={nameId} />
        ))}
      </CustomCarousel>
    </Section>
  );
};

type AccommodationShortcutProps = {
  nameId: AccommodationNameId;
};

const AccommodationShortcut = ({ nameId }: AccommodationShortcutProps) => {
  const imagePath = ACCOMMODATION_IMAGE_PATHS[nameId][0];
  const accommodationName = ACCOMMODATION_NAMES[nameId];
  const url = `/accommodation/#${nameId}`;

  return (
    <ShortcutCard>
      <CarouselImage imagePath={imagePath} description={accommodationName} />
      <AccommodationName>{accommodationName}</AccommodationName>
      <ShortcutLink href={url}>
        Find out more&nbsp;
        <FontAwesomeIcon icon={faArrowRight} />
      </ShortcutLink>
    </ShortcutCard>
  );
};

const ShortcutCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 80%;
  margin: 0px auto;
  padding: 16px;

  border: 2px solid var(--secondary-color);
  border-radius: 12px;
`;

const AccommodationName = styled.h3`
  font-size: large;
  font-weight: 500;
`;

const ShortcutLink = styled(CustomLink)`
  color: var(--secondary-color);
`;
