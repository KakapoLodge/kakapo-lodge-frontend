"use client";

import { Fragment } from "react";
import styled from "styled-components";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { IsMobileProps } from "../lib/types";
import CustomIcon from "../ui/CustomIcon";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import ImageCarousel from "../ui/ImageCarousel";
import NavBar from "../ui/NavBar";
import Page from "../ui/Page";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import Section from "../ui/Section";
import Sections from "../ui/Sections";
import {
  FACILITIES,
  FACILITIES_PAGE_TITLE,
  PURCHASEABLE_HEADER,
  PURCHASEABLES,
  SERVICES,
  SERVICES_HEADER,
} from "./content";

const FacilitiesPage = () => {
  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={FACILITIES_PAGE_TITLE} />

        <Sections>
          {FACILITIES.map((facility) => (
            <Fragment key={facility.name}>
              <FacilitySection {...facility} />
              <Divider />
            </Fragment>
          ))}

          <ServiceSection />
          <Divider />
          <PurchaseableSection />
        </Sections>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default FacilitiesPage;

type FacilitySectionProps = {
  name: string;
  description: string;
  imagePaths: string[];
};

const FacilitySection = ({
  name,
  description,
  imagePaths,
}: FacilitySectionProps) => {
  return (
    <Section>
      <Header text={name} />
      <p>{description}</p>
      <ImageCarousel imagePaths={imagePaths} description={description} />
    </Section>
  );
};

const ServiceSection = () => {
  return (
    <Section>
      <Header text={SERVICES_HEADER} />
      <div>
        {SERVICES.map((service) => (
          <Service key={service.description} {...service} />
        ))}
      </div>
    </Section>
  );
};

const PurchaseableSection = () => {
  return (
    <Section>
      <Header text={PURCHASEABLE_HEADER} />
      <div>
        {PURCHASEABLES.map((purchaseable) => (
          <Service key={purchaseable.description} {...purchaseable} />
        ))}
      </div>
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
  const isMobile = useMobileDetection();
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
