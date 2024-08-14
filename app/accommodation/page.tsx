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
import { useIsMobile } from "../lib/hooks";
import { IsMobileProps } from "../lib/types";
import CustomCarousel from "../ui/CustomCarousel";
import CustomIcon from "../ui/CustomIcon";
import LoadingAnimation from "../ui/LoadingAnimation";
import PageContent, { PageTitle } from "../ui/PageContent";
import {
  ALL_ACCOMMODATION,
  ALL_NAME_IDS,
  PRIVATE_BATHROOM_NAME_IDS,
  PRIVATE_ROOM_NAME_IDS,
  SEPARATE_BEDS_NAME_IDS,
} from "./content";
import { getTodaysDateRfc3339 } from "./date";
import { RatePlansMap } from "./mapping";
import { useGetRatesQuery } from "./rates";

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

  const [matchingNameIds, setMatchingNameIds] = useState(ALL_NAME_IDS);

  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [havePrivateBathroom, setHavePrivateBathroom] = useState(false);
  const [haveSeparateBeds, setHaveSeparateBeds] = useState(false);

  const toggleFilterPrivateRoom = () => {
    const newValue = !isPrivateRoom;
    setIsPrivateRoom(newValue);

    const accommodationIds = filterAccommodation(
      newValue,
      havePrivateBathroom,
      haveSeparateBeds,
    );

    setMatchingNameIds(new Set(accommodationIds));
  };

  const toggleFilterPrivateBathroom = () => {
    const newValue = !havePrivateBathroom;
    setHavePrivateBathroom(newValue);

    const accommodationIds = filterAccommodation(
      isPrivateRoom,
      newValue,
      haveSeparateBeds,
    );

    setMatchingNameIds(new Set(accommodationIds));
  };

  const toggleFilterSeparateBeds = () => {
    const newValue = !haveSeparateBeds;
    setHaveSeparateBeds(newValue);

    const accommodationIds = filterAccommodation(
      isPrivateRoom,
      havePrivateBathroom,
      newValue,
    );

    setMatchingNameIds(new Set(accommodationIds));
  };

  const todaysDateRfc3339 = getTodaysDateRfc3339();

  const { data, error, isLoading } = useGetRatesQuery({
    start_date: todaysDateRfc3339,
    end_date: todaysDateRfc3339,
  });

  return (
    <IsMobileContext.Provider value={isMobile}>
      <PageContent>
        <PageTitle>Accommodation</PageTitle>
        <AccommodationCriteria
          toggleFilterPrivateRoom={toggleFilterPrivateRoom}
          toggleFilterPrivateBathroom={toggleFilterPrivateBathroom}
          toggleFilterSeparateBeds={toggleFilterSeparateBeds}
        />
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <LoadingAnimation />
        ) : data ? (
          <AccommodationCards
            matchingNameIds={matchingNameIds}
            ratePlansMap={data}
          />
        ) : (
          <></>
        )}
      </PageContent>
    </IsMobileContext.Provider>
  );
};

export default AccommodationPage;

type AccommodationCriteriaProps = {
  toggleFilterPrivateRoom: ChangeEventHandler<HTMLInputElement>;
  toggleFilterPrivateBathroom: ChangeEventHandler<HTMLInputElement>;
  toggleFilterSeparateBeds: ChangeEventHandler<HTMLInputElement>;
};

const AccommodationCriteria = (props: AccommodationCriteriaProps) => {
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
      {showFilters ? <Filters {...props} /> : <></>}
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

type FiltersProps = {
  toggleFilterPrivateRoom: ChangeEventHandler<HTMLInputElement>;
  toggleFilterPrivateBathroom: ChangeEventHandler<HTMLInputElement>;
  toggleFilterSeparateBeds: ChangeEventHandler<HTMLInputElement>;
};

const Filters = ({
  toggleFilterPrivateRoom,
  toggleFilterPrivateBathroom,
  toggleFilterSeparateBeds,
}: FiltersProps) => {
  const isMobile = useContext(IsMobileContext);

  return (
    <_Filters $isMobile={isMobile}>
      <Filter label="Private Room?" onChange={toggleFilterPrivateRoom} />
      <Filter
        label="Private Bathroom?"
        onChange={toggleFilterPrivateBathroom}
      />
      <Filter label="Separate Beds?" onChange={toggleFilterSeparateBeds} />
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
  matchingNameIds: Set<string>;
  ratePlansMap: RatePlansMap;
};

const AccommodationCards = ({
  matchingNameIds,
  ratePlansMap,
}: AccommodationCardsProps) => {
  const isMobile = useContext(IsMobileContext);

  const matchingAccommodation = ALL_ACCOMMODATION.filter((accommodation) =>
    matchingNameIds.has(accommodation.nameId),
  );

  return (
    <_AccommodationCards $isMobile={isMobile}>
      {matchingAccommodation.map((accommodation) => {
        const ratePlan = ratePlansMap[accommodation.nameId];
        const ratePlanDate = ratePlan["rate_plan_dates"][0];

        return (
          <AccommodationCard
            key={accommodation.name}
            {...accommodation}
            price={ratePlanDate.rate}
            available={ratePlanDate.available}
          />
        );
      })}
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
  nameId: string;
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
  const { nameId, name, price, available, url, imagePaths } = props;

  return (
    <_Card $isMobile={isMobile} id={nameId}>
      <CustomCarousel
        imagePaths={imagePaths}
        description={name}
        widthPercentage={isMobile ? 100 : 48}
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

  width: ${(props) => (props.$isMobile ? "calc(100% - 32px)" : "240px")};
  padding: 8px 16px;

  border-radius: 8px;
`;

const filterAccommodation = (
  isPrivateRoom: boolean,
  isPrivateBathroom: boolean,
  haveSeparateBeds: boolean,
) => {
  let accommodationIds = structuredClone(ALL_NAME_IDS);

  if (isPrivateRoom) {
    accommodationIds = accommodationIds.intersection(PRIVATE_ROOM_NAME_IDS);
  }

  if (isPrivateBathroom) {
    accommodationIds = accommodationIds.intersection(PRIVATE_BATHROOM_NAME_IDS);
  }

  if (haveSeparateBeds) {
    accommodationIds = accommodationIds.intersection(SEPARATE_BEDS_NAME_IDS);
  }

  return accommodationIds;
};
