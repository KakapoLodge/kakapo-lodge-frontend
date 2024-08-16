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
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { IsMobileProps } from "../lib/types";
import CustomIcon from "../ui/CustomIcon";
import Header from "../ui/Header";
import ImageCarousel from "../ui/ImageCarousel";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import Section from "../ui/Section";
import Sections from "../ui/Sections";
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
  faClock,
);

const FacilitiesPage = () => {
  const isMobile = useMobileDetection();

  return (
    <IsMobileContext.Provider value={isMobile}>
      <PageContent>
        <PageTitle text="Facilities" />

        <Sections>
          {FACILITIES.map((facility) => (
            <Fragment key={facility.name}>
              <Facility {...facility} />
              <Divider />
            </Fragment>
          ))}

          <Section>
            <Header text="Our Services" />
            <div>
              {SERVICES.map((service) => (
                <Service key={service.description} {...service} />
              ))}
            </div>
          </Section>

          <Divider />

          <Section>
            <Header text="Purchaseable" />
            <div>
              {PURCHASEABLES.map((purchaseable) => (
                <Service key={purchaseable.description} {...purchaseable} />
              ))}
            </div>
          </Section>
        </Sections>
      </PageContent>
    </IsMobileContext.Provider>
  );
};

export default FacilitiesPage;

type FacilityProps = {
  name: string;
  description: string;
  imagePaths: string[];
};

const Facility = ({ name, description, imagePaths }: FacilityProps) => {
  return (
    <Section>
      <Header text={name} />
      <p>{description}</p>
      <ImageCarousel imagePaths={imagePaths} description={description} />
    </Section>
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
