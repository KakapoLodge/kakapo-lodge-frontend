"use client";

import { useMobileDetection } from "@/app/.lib/hooks/useMobileDetection";
import { IsMobileProps } from "@/app/.lib/types";
import CustomIcon from "@/app/.ui/CustomIcon";
import Footer from "@/app/.ui/Footer";
import Header from "@/app/.ui/Header";
import ImageCarousel from "@/app/.ui/ImageCarousel";
import MobileFooter from "@/app/.ui/MobileFooter";
import NavBar from "@/app/.ui/NavBar";
import Page from "@/app/.ui/Page";
import PageContent from "@/app/.ui/PageContent";
import PageTitle from "@/app/.ui/PageTitle";
import Section from "@/app/.ui/Section";
import Sections from "@/app/.ui/Sections";
import {
  FACILITIES,
  FACILITIES_PAGE_TITLE,
  PURCHASEABLE_HEADER,
  PURCHASEABLES,
  SERVICES,
  SERVICES_HEADER,
} from "@/app/facilities/content";
import { Fragment } from "react";
import styled from "styled-components";

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

        <Footer />
      </PageContent>

      <MobileFooter />
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

  border-bottom: ${(props) => (props.$isMobile ? 1 : 2)}px solid
    var(--secondary-color);
`;
