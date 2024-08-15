"use client";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowDownWideShort,
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
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { useAppDispatch, useAppSelector, useIsMobile } from "../lib/hooks";
import { IsMobileProps } from "../lib/types";
import CustomIcon from "../ui/CustomIcon";
import ImageCarousel from "../ui/ImageCarousel";
import LoadingAnimation from "../ui/LoadingAnimation";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import {
  ALL_ADDITIONAL_FEATURES,
  ALL_IMAGE_PATHS,
  ALL_NAME_IDS,
  BASE_FEATURES,
  BOOKING_URLS,
  DEFAULT_RATES,
  NAMES,
} from "./content";
import { getTodaysDateRfc3339 } from "./date";
import { filterSlice } from "./filterSlice";
import { useGetRatesQuery } from "./rates";
import { AccommodationNameId, AllRates, Rates } from "./types";

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
  faUtensils,
);

// TODO: refactor
const AccommodationPage = () => {
  const isMobile = useIsMobile();

  const todaysDateRfc3339 = getTodaysDateRfc3339();

  const { data, error, isLoading } = useGetRatesQuery({
    start_date: todaysDateRfc3339,
    end_date: todaysDateRfc3339,
  });

  return (
    <IsMobileContext.Provider value={isMobile}>
      <PageContent>
        <PageTitle text="Accommodation" />
        <AccommodationCriteria />

        {error ? (
          <AccommodationCards allRates={DEFAULT_RATES} />
        ) : isLoading ? (
          <LoadingAnimation />
        ) : data ? (
          <AccommodationCards allRates={data} />
        ) : (
          <></>
        )}
      </PageContent>
    </IsMobileContext.Provider>
  );
};

export default AccommodationPage;

const AccommodationCriteria = () => {
  const isMobile = useContext(IsMobileContext);

  const [showFilters, setShowFilters] = useState(!isMobile);
  const [disableFilterButton, setDisableFilterButton] = useState(false);

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
    setDisableFilterButton(true);
    setTimeout(() => setDisableFilterButton(false), 500);
  };

  return (
    <_AccommodationCriteria $isMobile={isMobile}>
      <FilterButton
        disabled={disableFilterButton}
        onClick={toggleShowFilters}
      />
      {showFilters ? <Filters /> : <></>}
    </_AccommodationCriteria>
  );
};

const _AccommodationCriteria = styled.div<IsMobileProps>`
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);
  background-color: var(--secondary-color);
  color: white;

  position: sticky;
  top: ${(props) => (props.$isMobile ? "64px" : "80px")};

  z-index: 1001;

  display: ${(props) => (props.$isMobile ? "block" : "flex")};
  gap: 16px;
  justify-content: center;
`;

type FilterButtonProps = {
  disabled: boolean;
  onClick: MouseEventHandler<Element>;
};

const FilterButton = ({ disabled, onClick }: FilterButtonProps) => {
  const isMobile = useContext(IsMobileContext);
  return (
    <_FilterButton $isMobile={isMobile} $disabled={disabled} onClick={onClick}>
      Filter <FontAwesomeIcon icon={faArrowDownWideShort} />
    </_FilterButton>
  );
};

type _FilterButtonProps = {
  $disabled: boolean;
};

const _FilterButton = styled.div<IsMobileProps & _FilterButtonProps>`
  display: ${(props) => (props.$isMobile ? "block" : "none")};

  text-align: center;
  padding: 6px;

  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  /* border-top: 1px solid var(--primary-color); */
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);
`;

const Filters = () => {
  const isMobile = useContext(IsMobileContext);
  const dispatch = useAppDispatch();

  const {
    toggleFilterPrivateRoom,
    toggleFilterPrivateBathroom,
    toggleFilterSeparateBeds,
  } = filterSlice.actions;

  return (
    <_Filters $isMobile={isMobile}>
      <Filter
        label="Private Room?"
        onChange={() => dispatch(toggleFilterPrivateRoom())}
      />
      <Filter
        label="Private Bathroom?"
        onChange={() => dispatch(toggleFilterPrivateBathroom())}
      />
      <Filter
        label="Separate Beds?"
        onChange={() => dispatch(toggleFilterSeparateBeds())}
      />
    </_Filters>
  );
};

const _Filters = styled.div<IsMobileProps>`
  display: flex;

  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: ${(props) => (props.$isMobile ? "4px" : "20px")};

  padding: 8px;
  justify-content: center;
`;

type FilterProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Filter = ({ label, onChange }: FilterProps) => {
  const isMobile = useContext(IsMobileContext);

  // last character should be question mark
  const filterId = label.slice(0, -1).toLowerCase().replaceAll(" ", "-");

  return (
    <_Filter $isMobile={isMobile}>
      <label htmlFor={filterId}>{label}</label>
      <Checkbox id={filterId} type="checkbox" onChange={onChange} />
    </_Filter>
  );
};

const _Filter = styled.div<IsMobileProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isMobile ? "space-between" : "normal")};
  gap: 4px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

type AccommodationCardsProps = {
  allRates: AllRates;
};

const AccommodationCards = ({ allRates }: AccommodationCardsProps) => {
  const isMobile = useContext(IsMobileContext);

  const matchingNameIds = new Set(
    useAppSelector((state) => state.filter.matchingNameIds),
  );
  const nameIds = ALL_NAME_IDS.filter((nameId) => matchingNameIds.has(nameId));

  return (
    <_AccommodationCards $isMobile={isMobile}>
      {nameIds.map((nameId) => (
        <AccommodationCard
          key={nameId}
          nameId={nameId}
          rates={allRates[nameId]}
        />
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
  nameId: AccommodationNameId;
  rates: Rates;
};

const AccommodationCard = ({ nameId, rates }: AccommodationCardProps) => {
  const isMobile = useContext(IsMobileContext);
  const name = NAMES[nameId];

  return (
    <_Card $isMobile={isMobile} id={nameId}>
      <ImageCarousel
        imagePaths={ALL_IMAGE_PATHS[nameId]}
        description={name}
        widthPercentage={isMobile ? 100 : 48}
      />

      <Text>
        <Name text={name} />
        <Price price={rates.price} minStay={rates.overallMinStay} />
        <Features nameId={nameId} />
        <br />
        <Availability
          available={rates.overallAvailable}
          isForSale={rates.isForSale}
        />
        <BookButton price={rates.price} url={BOOKING_URLS[nameId]} />
      </Text>
    </_Card>
  );
};

const _Card = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: ${(props) => (props.$isMobile ? "16px" : "32px")};

  width: 80%;
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

type NameProps = {
  text: string;
};

const Name = ({ text }: NameProps) => {
  const isMobile = useContext(IsMobileContext);
  return <_Name $isMobile={isMobile}>{text}</_Name>;
};

const _Name = styled.h2<IsMobileProps>`
  font-size: ${(props) => (props.$isMobile ? "larger" : "x-large")};
`;

type PriceProps = {
  price: number;
  minStay: number | null;
};

const Price = ({ price, minStay }: PriceProps) => {
  const priceText = `Price: $${price}`;
  const text =
    minStay === null
      ? `${priceText}`
      : `${priceText} (min stay: ${minStay} night${minStay === 1 ? "" : "s"})`;

  return <_Price>{text}</_Price>;
};

const _Price = styled.p`
  color: var(--secondary-color);
  font-size: large;
  font-weight: 500;
`;

type FeaturesProps = {
  nameId: AccommodationNameId;
};

const Features = ({ nameId }: FeaturesProps) => {
  const { sleeps, size, roomConfiguration } = BASE_FEATURES[nameId];
  const additionalFeatures = ALL_ADDITIONAL_FEATURES[nameId];

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

      {...additionalFeatures.map(({ icon, description }) => (
        <div key={description}>
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

type AvailabilityProps = {
  available: number | null;
  isForSale: boolean;
};

const Availability = ({ available, isForSale }: AvailabilityProps) => {
  const isMobile = useContext(IsMobileContext);
  const text = isForSale ? getAvailableOrSoldOutText(available) : "Unavailable";

  return available === null ? (
    <></>
  ) : (
    <_Availability $isMobile={isMobile}>{text}</_Availability>
  );
};

const getAvailableOrSoldOutText = (available: number | null) => {
  return available === 0 ? "Sold out" : `${available} available`;
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

  width: ${(props) => (props.$isMobile ? "calc(100% - 32px)" : "240px")};
  padding: 8px 16px;

  border-radius: 8px;
`;
