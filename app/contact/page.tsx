"use client";

import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { useIsMobile } from "../lib/hooks";
import { IsMobileProps } from "../lib/types";
import PageContent, { PageTitle } from "../ui/PageContent";
import CustomLink from "../ui/CustomLink";

const ContactPage = () => {
  const isMobile = useIsMobile();

  return (
    <IsMobileContext.Provider value={isMobile}>
      <PageContent>
        <PageTitle>Contact Us</PageTitle>

        <ContactInformation>
          <ContactDetails>
            <ContactHeader>Reach us via</ContactHeader>
            <p>
              Phone:&nbsp;
              <CustomLink href="tel:03 315 7472" target="_blank">
                (03) 315 7472
              </CustomLink>
            </p>
            <p>
              Email:&nbsp;
              <CustomLink href="mailto:staykakapo@xtra.co.nz" target="_blank">
                staykakapo@xtra.co.nz
              </CustomLink>
            </p>
          </ContactDetails>

          <ContactDetails>
            <ContactHeader>Our Location</ContactHeader>
            <p>Just a 5 minutes walk away from the Hot Pools!</p>

            <GoogleMaps />
          </ContactDetails>
        </ContactInformation>
      </PageContent>
    </IsMobileContext.Provider>
  );
};

export default ContactPage;

const ContactInformation = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return (
    <_ContactInformation $isMobile={isMobile}>{children}</_ContactInformation>
  );
};

const _ContactInformation = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "24px" : "32px")};
`;

const ContactDetails = styled.div`
  text-align: center;
`;

const ContactHeader = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_ContactHeader $isMobile={isMobile}>{children}</_ContactHeader>;
};

const _ContactHeader = styled.h2<IsMobileProps>`
  font-size: ${(props) => (props.$isMobile ? "larger" : "x-large")};
`;

const GoogleMaps = () => {
  const isMobile = useContext(IsMobileContext);
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
