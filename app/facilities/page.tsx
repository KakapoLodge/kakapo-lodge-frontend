"use client";

import { Fragment, useContext } from "react";
import styled from "styled-components";
import { MobileDetectionContext } from "../lib/context";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { IsMobileProps } from "../lib/types";
import CustomIcon from "../ui/CustomIcon";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import ImageCarousel from "../ui/ImageCarousel";
import NavBar from "../ui/NavBar";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import Section from "../ui/Section";
import Sections from "../ui/Sections";
import { FACILITIES, PURCHASEABLES, SERVICES } from "./content";

const FacilitiesPage = () => {
  const isMobile = useMobileDetection();

  return (
    <MobileDetectionContext.Provider value={isMobile}>
      <NavBar />
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
      <Footer />
    </MobileDetectionContext.Provider>
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
  const isMobile = useContext(MobileDetectionContext);
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
