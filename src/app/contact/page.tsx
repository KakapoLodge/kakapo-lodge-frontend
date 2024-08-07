"use client";
import styled from "styled-components";
import PageContent, { PageTitle } from "../ui/PageContent";
import CustomLink from "../ui/CustomLink";


const MOBILE_MAX_WIDTH = 800;
const IS_MOBILE = document.documentElement.clientWidth < MOBILE_MAX_WIDTH;

const Contact = () => {
  return (
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
  );
};

export default Contact;

const ContactInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (width < 700px) {
    gap: 24px;
  }
`;

const ContactDetails = styled.div`
  text-align: center;
`;

const ContactHeader = styled.h2`
  font-size: x-large;

  @media (width < 700px) {
    font-size: larger;
  }
`;

const GoogleMaps = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4456.815025684654!2d172.82703775066332!3d-42.525528299956015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d306383a372bc73%3A0x7424d96525465fe0!2sHanmer%20Springs%20Kakapo%20Lodge!5e0!3m2!1sen!2snz!4v1721621297292!5m2!1sen!2snz"
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ border: 0, width: "64%", aspectRatio: 1.7 }}
    ></iframe>
  );
};
