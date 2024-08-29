"use client";

import Link from "next/link";
import {
  ChangeEventHandler,
  Dispatch,
  Fragment,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { RangePicker } from "react-ease-picker";
import styled from "styled-components";
import { useGetRatesQuery } from "../lib/api/ratesApi";
import {
  getNextDaysDateRfc3339,
  getPreviousDaysDateRfc3339,
  getTodaysDateRfc3339,
} from "../lib/dates";
import { useGoogleAnalyticsEvents } from "../lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { useScrollPosition } from "../lib/hooks/useScrollPosition";
import { useAppDispatch, useAppSelector } from "../lib/hooks/useStore";
import { linearInterpolate } from "../lib/math";
import { IsMobileProps } from "../lib/types";
import Card from "../ui/Card";
import CustomIcon from "../ui/CustomIcon";
import ImageCarousel from "../ui/ImageCarousel";
import LoadingAnimation from "../ui/LoadingAnimation";
import NavBar from "../ui/NavBar";
import Page from "../ui/Page";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import {
  ACCOMMODATION_IMAGE_PATHS,
  ACCOMMODATION_LOADING_TEXT,
  ACCOMMODATION_NAME_IDS,
  ACCOMMODATION_NAMES,
  ACCOMMODATION_PAGE_TITLE,
  ALL_ADDITIONAL_FEATURES,
  BASE_FEATURES,
  BOOK_BUTTON_TEXT,
  BOOKING_URLS,
  DEFAULT_RATES,
} from "./content";
import { filterSlice } from "./filterSlice";
import { AccommodationNameId, AllRates, Rates } from "./types";

const AccommodationPage = () => {
  const todaysDateRfc3339 = getTodaysDateRfc3339();

  const [startDateRfc3339, setStartDateRfc3339] = useState(todaysDateRfc3339);
  const [endDateRfc3339, setEndDateRfc3339] = useState(todaysDateRfc3339);

  const { data, error, isLoading, isFetching } = useGetRatesQuery({
    start_date: startDateRfc3339,
    end_date: endDateRfc3339,
  });

  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={ACCOMMODATION_PAGE_TITLE} />
        <AccommodationCriteria
          setStartDateRfc3339={setStartDateRfc3339}
          setEndDateRfc3339={setEndDateRfc3339}
        />

        {error ? (
          <AccommodationCards allRates={DEFAULT_RATES} />
        ) : isLoading || isFetching ? (
          <LoadingAnimation text={ACCOMMODATION_LOADING_TEXT} />
        ) : data ? (
          <AccommodationCards allRates={data} />
        ) : (
          <></>
        )}
      </PageContent>
    </Page>
  );
};

export default AccommodationPage;

type AccommodationCriteriaProps = {
  setStartDateRfc3339: Dispatch<SetStateAction<string>>;
  setEndDateRfc3339: Dispatch<SetStateAction<string>>;
};

const AccommodationCriteria = (props: AccommodationCriteriaProps) => {
  const isMobile = useMobileDetection();
  const scrollPosition = useScrollPosition();

  const topRange = isMobile ? [46, 70] : [70, 86];
  const top = linearInterpolate(scrollPosition, [0, 50], topRange);

  const [showFilters, setShowFilters] = useState(!isMobile);
  const [disableFilterButton, setDisableFilterButton] = useState(false);

  const toggleShowFilters = () => {
    setShowFilters(!showFilters);
    setDisableFilterButton(true);
    setTimeout(() => setDisableFilterButton(false), 500);
  };

  return (
    <_AccommodationCriteria $isMobile={isMobile} $top={top}>
      <DatePicker {...props} />
      <FilterButton
        disabled={disableFilterButton}
        onClick={toggleShowFilters}
      />
      {showFilters ? <Filters /> : <></>}
    </_AccommodationCriteria>
  );
};

const _AccommodationCriteria = styled.div<IsMobileProps & { $top: number }>`
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);
  background-color: var(--secondary-color);
  color: white;

  position: sticky;
  top: ${(props) => props.$top}px;

  z-index: 1001;

  display: ${(props) => (props.$isMobile ? "block" : "flex")};
  gap: 16px;
  justify-content: center;
`;

type DatePickerProps = {
  setStartDateRfc3339: Dispatch<SetStateAction<string>>;
  setEndDateRfc3339: Dispatch<SetStateAction<string>>;
};

const DatePicker = ({
  setStartDateRfc3339,
  setEndDateRfc3339,
}: DatePickerProps) => {
  const id = "date-picker";
  const isMobile = useMobileDetection();
  const { sendDatesPickedEvent } = useGoogleAnalyticsEvents();

  const todaysDateRfc3339 = getTodaysDateRfc3339();
  const tomorrowsDateRfc3339 = getNextDaysDateRfc3339(todaysDateRfc3339);

  const dispatch = useAppDispatch();

  const onSelectDates = (rangeStart: string, rangeEnd: string) => {
    const startDate = rangeStart;
    const endDate = getPreviousDaysDateRfc3339(rangeEnd);

    setStartDateRfc3339(startDate);
    setEndDateRfc3339(endDate);

    sendDatesPickedEvent(rangeStart, rangeEnd);
  };

  return (
    <_Filters $isMobile={isMobile}>
      <_Filter $isMobile={isMobile}>
        <Label htmlFor={id}>Check In/Out:</Label>
        <RangePicker
          id={id}
          css="width: 200px; text-align: center;"
          format="DD MMM YYYY"
          minDate={todaysDateRfc3339}
          startDate={todaysDateRfc3339}
          endDate={tomorrowsDateRfc3339}
          daysLocale={EASE_PICK_DAYS_LOCALE}
          onSelect={onSelectDates}
          // @ts-ignore
          options={EASE_PICK_OPTIONS}
        />
      </_Filter>
    </_Filters>
  );
};

const EASE_PICK_DAYS_LOCALE = {
  one: "night",
  two: "nights",
  few: "nights",
  many: "nights",
  other: "nights",
};

const EASE_PICK_OPTIONS = {
  RangePlugin: {
    tooltipNumber: (numberOfNights: number) => numberOfNights - 1,
  },
  LockPlugin: {
    // check-in (1 day), check-out (1 day)
    minDays: 2,
    // Little Hotelier API max is 28 days
    // https://helpcentre.littlehotelier.com/en/articles/8674041-implement-the-rates-api
    maxDays: 28,
  },
};

type FilterButtonProps = {
  disabled: boolean;
  onClick: MouseEventHandler<Element>;
};

const FilterButton = ({ disabled, onClick }: FilterButtonProps) => {
  const isMobile = useMobileDetection();
  return (
    <_FilterButton $isMobile={isMobile} $disabled={disabled} onClick={onClick}>
      Filter <CustomIcon icon="fa-arrow-down-wide-short" />
    </_FilterButton>
  );
};

type _FilterButtonProps = {
  $disabled: boolean;
};

const _FilterButton = styled.div<IsMobileProps & _FilterButtonProps>`
  display: ${(props) => (props.$isMobile ? "block" : "none")};

  text-align: center;
  padding: 4px;

  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  /* border-top: 1px solid var(--primary-color); */
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);
`;

const Filters = () => {
  const isMobile = useMobileDetection();
  const dispatch = useAppDispatch();

  const {
    toggleFilterPrivateRoom,
    toggleFilterPrivateBathroom,
    toggleFilterSeparateBeds,
    toggleFilterGroundFloor,
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
      <Filter
        label="Ground Floor?"
        onChange={() => dispatch(toggleFilterGroundFloor())}
      />
    </_Filters>
  );
};

const _Filters = styled.div<IsMobileProps>`
  display: flex;

  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: ${(props) => (props.$isMobile ? "4px" : "20px")};

  padding: ${(props) => (props.$isMobile ? "4px 16px" : "8px")};
  justify-content: center;
`;

type FilterProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Filter = ({ label, onChange }: FilterProps) => {
  const isMobile = useMobileDetection();
  const { sendAccommodationFilteredEvent } = useGoogleAnalyticsEvents();

  // last character should be question mark
  const filterId = label.slice(0, -1).toLowerCase().replaceAll(" ", "-");

  return (
    <_Filter $isMobile={isMobile}>
      <Label htmlFor={filterId}>{label}</Label>
      <Checkbox
        id={filterId}
        type="checkbox"
        onChange={onChange}
        onClick={() => sendAccommodationFilteredEvent(filterId)}
      />
    </_Filter>
  );
};

const _Filter = styled.div<IsMobileProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isMobile ? "space-between" : "normal")};
  gap: 4px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

type AccommodationCardsProps = {
  allRates: AllRates;
};

const AccommodationCards = ({ allRates }: AccommodationCardsProps) => {
  const isMobile = useMobileDetection();

  const matchingNameIds = new Set(
    useAppSelector((state) => state.filter.matchingNameIds),
  );
  const nameIds = ACCOMMODATION_NAME_IDS.filter((nameId) =>
    matchingNameIds.has(nameId),
  );

  return (
    <_AccommodationCards $isMobile={isMobile}>
      {nameIds.map((nameId) => (
        <Fragment key={nameId}>
          <ShortcutLandingPoint id={nameId} $isMobile={isMobile} />
          <AccommodationCard
            key={nameId}
            nameId={nameId}
            rates={allRates[nameId]}
          />
        </Fragment>
      ))}
    </_AccommodationCards>
  );
};

const _AccommodationCards = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "6px" : "8px")};

  margin: 16px 0px;
`;

const ShortcutLandingPoint = styled.div<IsMobileProps>`
  position: relative;
  bottom: ${(props) => (props.$isMobile ? "0px" : "130px")};
`;

type AccommodationCardProps = {
  nameId: AccommodationNameId;
  rates: Rates;
};

const AccommodationCard = ({ nameId, rates }: AccommodationCardProps) => {
  const isMobile = useMobileDetection();
  const name = ACCOMMODATION_NAMES[nameId];

  return (
    <_Card $isMobile={isMobile}>
      <ImageCarousel
        imagePaths={ACCOMMODATION_IMAGE_PATHS[nameId]}
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

const _Card = styled(Card)<IsMobileProps>`
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  gap: ${(props) => (props.$isMobile ? "16px" : "32px")};
`;

const Text = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useMobileDetection();
  return <_Text $isMobile={isMobile}>{children}</_Text>;
};

const _Text = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin: ${(props) => (props.$isMobile ? "0px" : "8px 0px")};
`;

type NameProps = {
  text: string;
};

const Name = ({ text }: NameProps) => {
  const isMobile = useMobileDetection();
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
        <CustomIcon icon="fa-user" /> Sleeps: {sleeps}
      </div>
      <div>
        <CustomIcon icon="fa-ruler" /> Room size: {size} m<sup>2</sup>
      </div>
      <div>
        <CustomIcon icon="fa-bed" /> {roomConfiguration}
      </div>
      <div>
        <CustomIcon icon="fa-temperature-arrow-up" /> Heater (
        <CustomIcon icon="fa-fan" /> Fan in summer)
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

  margin: 8px 0px;
`;

type AvailabilityProps = {
  available: number | null;
  isForSale: boolean;
};

const Availability = ({ available, isForSale }: AvailabilityProps) => {
  const isMobile = useMobileDetection();
  const availabilityText = getAvailabilityText(isForSale, available);
  const text = `${availabilityText} for the chosen dates`;

  return available === null ? (
    <></>
  ) : (
    <_Availability $isMobile={isMobile}>{text}</_Availability>
  );
};

const getAvailabilityText = (isForSale: boolean, available: number | null) => {
  if (!isForSale) {
    return "Unavailable";
  } else if (available === 0) {
    return "Sold out";
  } else if (available === 1) {
    return "Only 1 left";
  } else {
    return `${available} available`;
  }
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
  const isMobile = useMobileDetection();
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();
  const discountedPrice = (price * 0.95).toFixed(2);

  return (
    <_BookButton
      target="_blank"
      href={url}
      onClick={() => sendLinkClickedEvent(url)}
      $isMobile={isMobile}
    >
      {`${BOOK_BUTTON_TEXT}${discountedPrice}`}
      <CustomIcon icon="fa-chevron-right" />
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
