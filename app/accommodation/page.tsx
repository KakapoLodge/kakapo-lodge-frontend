"use client";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBath,
  faBed,
  faBedPulse,
  faBreadSlice,
  faChevronRight,
  faFan,
  faFireBurner,
  faMugHot,
  faRug,
  faRuler,
  faShower,
  faTemperatureArrowUp,
  faTv,
  faUser,
  faUtensils,
  faVenus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { useIsMobile } from "../lib/hooks";
import { IsMobileProps } from "../lib/types";
import CustomCarousel from "../ui/CustomCarousel";
import CustomIcon from "../ui/CustomIcon";
import PageContent, { PageTitle } from "../ui/PageContent";
import { ALL_ACCOMMODATION } from "./content";

library.add(
  faBed,
  faShower,
  faBath,
  faVenusMars,
  faVenus,
  faTv,
  faBedPulse,
  faRug,
  faMugHot,
  faBreadSlice,
  faFireBurner,
  faUtensils
);

const AccommodationPage = () => {
  const isMobile = useIsMobile();

  return (
    <IsMobileContext.Provider value={isMobile}>
      <PageContent>
        <PageTitle>Accommodation</PageTitle>

        <AccommodationCards />
      </PageContent>
    </IsMobileContext.Provider>
  );
};

export default AccommodationPage;

const AccommodationCards = () => {
  const isMobile = useContext(IsMobileContext);
  return (
    <_AccommodationCards $isMobile={isMobile}>
      {ALL_ACCOMMODATION.map((accommodation) => (
        <AccommodationCard key={accommodation.name} {...accommodation} />
      ))}
    </_AccommodationCards>
  );
};

const _AccommodationCards = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "16px" : "24px")};

  margin: 16px 0px;
`;

type AccommodationCardProps = {
  name: string;
  price: number;
  sleeps: number;
  size: number;
  available: number;
  roomConfiguration: string;
  url: string;
  otherFeatures: Feature[];
  imagePaths: string[];
};

type Feature = {
  icon: string;
  description: string;
};

const AccommodationCard = (props: AccommodationCardProps) => {
  const isMobile = useContext(IsMobileContext);

  const { name, price, available, url, imagePaths } = props;

  return (
    <_Card $isMobile={isMobile}>
      <CustomCarousel
        imagePaths={imagePaths}
        description={name}
        widthPercentage={48}
      />

      <Text>
        <Name>{name}</Name>
        <Price>Tonight: ${price}</Price>
        <Features {...props} />
        <br />
        <Availability>{available} available tonight</Availability>
        <BookButton price={price} url={url} />
      </Text>
    </_Card>
  );
};

const _Card = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: ${(props) => (props.$isMobile ? "16px" : "32px")};

  width: ${(props) => (props.$isMobile ? "92%" : "76%")};
  margin: 0px auto;
  padding: 16px;

  border: 2px solid var(--secondary-color);
  border-radius: 16px;
`;

const Text = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_Text $isMobile={isMobile}>{children}</_Text>;
};

const _Text = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* TODO: change to accommodation card padding? */
  margin: ${(props) => (props.$isMobile ? "0px" : "8px 0px")};
`;

const Name = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_Name $isMobile={isMobile}>{children}</_Name>;
};

const _Name = styled.h2<IsMobileProps>`
  font-size: ${(props) => (props.$isMobile ? "larger" : "x-large")};
`;

const Price = styled.p`
  color: var(--secondary-color);
  font-size: large;
  font-weight: 500;
`;

type FeaturesProps = {
  sleeps: number;
  size: number;
  roomConfiguration: string;
  otherFeatures: Feature[];
};

const Features = ({
  sleeps,
  size,
  roomConfiguration,
  otherFeatures,
}: FeaturesProps) => {
  return (
    <_Features>
      <div>
        <CustomIcon icon={faUser} /> Sleeps: {sleeps}
      </div>
      <div>
        <CustomIcon icon={faRuler} /> Room size: {size} m<sup>2</sup>
      </div>
      <div>
        <CustomIcon icon={faBed} /> {roomConfiguration}
      </div>
      <div>
        <CustomIcon icon={faTemperatureArrowUp} /> Heater (
        <FontAwesomeIcon icon={faFan} /> Fan in summer)
      </div>

      {...otherFeatures.map(({ icon, description }) => (
        <div>
          <CustomIcon icon={icon} /> {description}
        </div>
      ))}
    </_Features>
  );
};

const _Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  /* TODO: change to gap / parent padding? */
  margin: 8px 0px;
`;

const Availability = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_Availability $isMobile={isMobile}>{children}</_Availability>;
};

const _Availability = styled.p<IsMobileProps>`
  color: var(--primary-color);
  font-size: large;

  text-align: ${(props) => (props.$isMobile ? "center" : "start")};
`;

type BookButtonProps = {
  price: number;
  url: string;
};

const BookButton = ({ price, url }: BookButtonProps) => {
  const isMobile = useContext(IsMobileContext);
  const discountedPrice = (price * 0.95).toFixed(2);

  return (
    <_BookButton target="_blank" href={url} $isMobile={isMobile}>
      Book with us @ ${discountedPrice}
      <FontAwesomeIcon icon={faChevronRight} />
    </_BookButton>
  );
};

const _BookButton = styled(Link)<IsMobileProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--secondary-color);
  color: white;

  width: ${(props) => (props.$isMobile ? "100%" : "240px")};
  padding: 8px 16px;

  border-radius: 8px;
`;
