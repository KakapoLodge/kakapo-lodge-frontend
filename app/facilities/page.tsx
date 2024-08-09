"use client";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBicycle,
  faBook,
  faBowlFood,
  faBox,
  faClock,
  faJugDetergent,
  faRug,
  faSuitcaseRolling,
  faTicket,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { useIsMobile } from "../lib/hooks";
import { IsMobileProps } from "../lib/types";
import CustomCarousel from "../ui/CustomCarousel";
import CustomIcon from "../ui/CustomIcon";
import PageContent, { PageTitle } from "../ui/PageContent";
import { FACILITIES, PURCHASEABLES, SERVICES } from "./content";

library.add(
  faBook,
  faBox,
  faSuitcaseRolling,
  faWifi,
  faTicket,
  faRug,
  faBicycle,
  faJugDetergent,
  faBowlFood,
  faClock
);

const FacilitiesPage = () => {
  const isMobile = useIsMobile();

  return (
    <IsMobileContext.Provider value={isMobile}>
      <PageContent>
        <PageTitle>Facilities</PageTitle>

        <FacilitySections>
          {FACILITIES.map((facility) => (
            <Fragment key={facility.name}>
              <Facility {...facility} />
              <Divider />
            </Fragment>
          ))}

          <FacilitySection>
            <FacilityName>Our Services</FacilityName>

            <div>
              {SERVICES.map((service) => (
                <Service key={service.description} {...service} />
              ))}
            </div>
          </FacilitySection>

          <Divider />

          <FacilitySection>
            <FacilityName>Purchaseable</FacilityName>

            <div>
              {PURCHASEABLES.map((purchaseable) => (
                <Service key={purchaseable.description} {...purchaseable} />
              ))}
            </div>
          </FacilitySection>
        </FacilitySections>
      </PageContent>
    </IsMobileContext.Provider>
  );
};

export default FacilitiesPage;

const FacilitySections = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_FacilitySections $isMobile={isMobile}>{children}</_FacilitySections>;
};

const _FacilitySections = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "12px" : "16px")};
`;

type FacilityProps = {
  name: string;
  description: string;
  imagePaths: string[];
};

const Facility = ({ name, description, imagePaths }: FacilityProps) => {
  return (
    <FacilitySection>
      <FacilityName>{name}</FacilityName>
      <p>{description}</p>

      <CustomCarousel imagePaths={imagePaths} description={description} />
    </FacilitySection>
  );
};

type ServiceProps = {
  iconName: string;
  description: string;
};

const Service = ({ iconName, description }: ServiceProps) => {
  return (
    <div>
      <CustomIcon icon={iconName} /> {description}
    </div>
  );
};

const FacilitySection = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_FacilitySection $isMobile={isMobile}>{children}</_FacilitySection>;
};

const _FacilitySection = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "4px" : "8px")};

  width: ${(props) => (props.$isMobile ? "calc(100% - 16px)" : "64%")};
  margin: 0px auto;
`;

const FacilityName = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_FacilityName $isMobile={isMobile}>{children}</_FacilityName>;
};

const _FacilityName = styled.h2<IsMobileProps>`
  font-size: ${(props) => (props.$isMobile ? "larger" : "x-large")};
`;

const Divider = () => {
  const isMobile = useContext(IsMobileContext);
  return <_Divider $isMobile={isMobile} />;
};

const _Divider = styled.div<IsMobileProps>`
  width: ${(props) => (props.$isMobile ? "100%" : "76%")};
  margin: 0px auto;

  border-bottom: ${(props) =>
    props.$isMobile
      ? "1px solid var(--secondary-color)"
      : "2px solid var(--secondary-color)"};
`;
