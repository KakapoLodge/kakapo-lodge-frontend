"use client";

import { useContext } from "react";
import styled from "styled-components";
import { MobileDetectionContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";
import CustomLink from "../ui/CustomLink";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import NavBar from "../ui/NavBar";
import Page from "../ui/Page";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import {
  CONTACT_DETAILS_HEADER,
  CONTACT_PAGE_TITLE,
  EMAIL_ADDRESS,
  EMAIL_LABEL,
  LOCATION_DESCRIPTION,
  LOCATION_HEADER,
  PHONE_LABEL,
  PHONE_NUMBER,
} from "./content";

const ContactPage = () => {
  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={CONTACT_PAGE_TITLE} />

        <ContactInformation>
          <ContactMethods />
          <Location />
        </ContactInformation>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default ContactPage;

const ContactInformation = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(MobileDetectionContext);
  return (
    <_ContactInformation $isMobile={isMobile}>{children}</_ContactInformation>
  );
};

const _ContactInformation = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "24px" : "32px")};
`;

const ContactMethods = () => {
  return (
    <ContactDetails>
      <Header text={CONTACT_DETAILS_HEADER} center={true} />
      <p>
        {PHONE_LABEL}&nbsp;
        <CustomLink target="_blank" href={`tel:${PHONE_NUMBER}`}>
          {PHONE_NUMBER}
        </CustomLink>
      </p>
      <p>
        {EMAIL_LABEL}&nbsp;
        <CustomLink target="_blank" href={`mailto:${EMAIL_ADDRESS}`}>
          {EMAIL_ADDRESS}
        </CustomLink>
      </p>
    </ContactDetails>
  );
};

const Location = () => {
  return (
    <ContactDetails>
      <Header text={LOCATION_HEADER} center={true} />
      <p>{LOCATION_DESCRIPTION}</p>
      <GoogleMaps />
    </ContactDetails>
  );
};

const ContactDetails = styled.div`
  text-align: center;
`;

const GoogleMaps = () => {
  const isMobile = useContext(MobileDetectionContext);
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4456.815025684654!2d172.82703775066332!3d-42.525528299956015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d306383a372bc73%3A0x7424d96525465fe0!2sHanmer%20Springs%20Kakapo%20Lodge!5e0!3m2!1sen!2snz!4v1721621297292!5m2!1sen!2snz"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{
        border: 0,
        width: isMobile ? "100%" : "64%",
        aspectRatio: isMobile ? 1.2 : 1.7,
      }}
    ></iframe>
  );
};
