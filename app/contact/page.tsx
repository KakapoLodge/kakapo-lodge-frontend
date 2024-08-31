"use client";

import { FormEvent, HTMLInputTypeAttribute, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import { useLazySubmitFormQuery } from "../lib/api/formApi";
import { useGoogleAnalyticsEvents } from "../lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { FormContent, IsMobileProps } from "../lib/types";
import CustomLink from "../ui/CustomLink";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import LoadingAnimation from "../ui/LoadingAnimation";
import NavBar from "../ui/NavBar";
import Page from "../ui/Page";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import Sections from "../ui/Sections";
import {
  CLOSE_BUTTON_LABEL,
  CONTACT_DETAILS_HEADER,
  CONTACT_PAGE_TITLE,
  EMAIL_ADDRESS,
  EMAIL_LABEL,
  FORM_EMAIL_LABEL,
  FORM_MESSAGE_LABEL,
  FORM_MESSAGE_MINIMUM_LENGTH,
  FORM_NAME_LABEL,
  FORM_PHONE_LABEL,
  FORM_SEND_COPY_LABEL,
  FORM_SUBMIT_BUTTON_LABEL,
  GOOGLE_RECAPTCHA_KEY,
  LOCATION_DESCRIPTION,
  LOCATION_HEADER,
  PHONE_LABEL,
  PHONE_NUMBER,
  SUBMIT_ERROR_TEXT,
  SUBMIT_INVALID_TEXT,
  SUBMIT_LOADING_TEXT,
  SUBMIT_SUCCESS_TEXT,
} from "./content";

const ContactPage = () => {
  const [submitForm, formResult] = useLazySubmitFormQuery();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={CONTACT_PAGE_TITLE} />

        <Sections>
          {showModal ? (
            <FormSubmissionModal closeModal={closeModal} {...formResult} />
          ) : (
            <></>
          )}
          <ContactForm submitForm={submitForm} openModal={openModal} />
          <ContactMethods />
          <Location />
        </Sections>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default ContactPage;

type FormSubmissionModalProps = {
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  closeModal: () => void;
};

const FormSubmissionModal = ({
  isError,
  isSuccess,
  isFetching,
  closeModal,
}: FormSubmissionModalProps) => {
  const isMobile = useMobileDetection();
  const colorType = isError ? "tertiary" : isSuccess ? "secondary" : "primary";

  return (
    <>
      <ModalBackgroundOverlay />

      <Modal $colorType={colorType} $isMobile={isMobile}>
        {isError ? (
          <ModalContent text={SUBMIT_ERROR_TEXT} closeModal={closeModal} />
        ) : isSuccess ? (
          <ModalContent text={SUBMIT_SUCCESS_TEXT} closeModal={closeModal} />
        ) : isFetching ? (
          <LoadingAnimation text={SUBMIT_LOADING_TEXT} height="auto" />
        ) : (
          <ModalContent text={SUBMIT_INVALID_TEXT} closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
};

type ModalContentProps = {
  text: string;
  closeModal: () => void;
};

const ModalContent = ({ text, closeModal }: ModalContentProps) => {
  return (
    <>
      <p>{text}</p>
      <Button onClick={closeModal}>{CLOSE_BUTTON_LABEL}</Button>
    </>
  );
};

const ModalBackgroundOverlay = styled.div`
  z-index: 1;

  position: absolute;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: #00000050;
`;

type ModalProps = {
  $colorType: string;
};

const Modal = styled.div<ModalProps & IsMobileProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 8px;

  z-index: 2;

  position: absolute;
  left: ${(props) =>
    props.$isMobile ? "calc(50vw - 168px)" : "calc(50vw - 150px)"};
  top: calc(50vh - 60px);

  width: 300px;
  height: 120px;
  padding: 16px;

  border-radius: 12px;
  border: 2px solid var(--${(props) => props.$colorType}-color);
  background-color: white;
  color: var(--${(props) => props.$colorType}-color);
`;

type ContactFormProps = {
  submitForm: (formContent: FormContent, preferCacheValue?: boolean) => {};
  openModal: () => void;
};

const ContactForm = ({ submitForm, openModal }: ContactFormProps) => {
  const isMobile = useMobileDetection();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <_ContactForm
      method="post"
      onSubmit={(event) =>
        handleSubmit(event, recaptchaRef.current, submitForm, openModal)
      }
      $isMobile={isMobile}
    >
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={GOOGLE_RECAPTCHA_KEY}
        size="invisible"
      />
      <SenderDetails />
      <Message />
      <SendCopy />
      <SubmitButton />
    </_ContactForm>
  );
};

const handleSubmit = (
  event: FormEvent<HTMLFormElement>,
  recaptcha: ReCAPTCHA | null,
  submitForm: (formContent: FormContent, preferCacheValue?: boolean) => {},
  openModal: () => void,
) => {
  event.preventDefault();
  recaptcha?.execute();

  const form = event.target;
  const formData = new FormData(form as HTMLFormElement);
  const formContent = Object.fromEntries(formData.entries()) as FormContent;

  submitForm(formContent);
  openModal();

  // @ts-ignore
  event.target.reset();
};

const _ContactForm = styled.form<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "4px" : "12px")};

  width: ${(props) => (props.$isMobile ? "calc(100% - 16px)" : "64%")};
  margin: 0px auto;
`;

const SenderDetails = () => {
  const isMobile = useMobileDetection();
  return (
    <_SenderDetails $isMobile={isMobile}>
      <SenderDetail label={FORM_EMAIL_LABEL} type="email" />
      <SenderDetail label={FORM_PHONE_LABEL} type="tel" />
      <SenderDetail label={FORM_NAME_LABEL} type="text" />
    </_SenderDetails>
  );
};

const _SenderDetails = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: ${(props) => (props.$isMobile ? "column" : "row")};
  justify-content: space-between;
`;

type SenderDetailProps = {
  label: string;
  type: HTMLInputTypeAttribute;
};

const SenderDetail = ({ label, type }: SenderDetailProps) => {
  const isMobile = useMobileDetection();
  const inputId = label.toLowerCase();

  return (
    <_SenderDetail $isMobile={isMobile}>
      <label htmlFor={inputId}>{label}</label>
      <SenderDetailInput type={type} id={inputId} name={inputId} required />
    </_SenderDetail>
  );
};

const _SenderDetail = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isMobile ? 100 : 32)}%;
`;

const SenderDetailInput = styled.input`
  padding: 6px 8px;
  font-size: medium;

  border-radius: 6px;
  border: 1px solid var(--primary-color);

  &:focus&:valid {
    border: 1px solid var(--secondary-color);
    outline: 1px solid var(--secondary-color);
  }

  &:focus&:invalid {
    border: 1px solid var(--tertiary-color);
    outline: 1px solid var(--tertiary-color);
  }
`;

const Message = () => {
  const inputId = FORM_MESSAGE_LABEL.toLowerCase();

  return (
    <_Message>
      <label htmlFor={inputId}>{FORM_MESSAGE_LABEL}</label>
      <MessageTextArea
        id={inputId}
        name={inputId}
        minLength={FORM_MESSAGE_MINIMUM_LENGTH}
        required
      />
    </_Message>
  );
};

const _Message = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageTextArea = styled.textarea`
  height: 256px;
  padding: 6px;

  font-family: inherit;

  border-radius: 8px;
  border: 1px solid var(--primary-color);

  &:focus&:valid {
    border: 1px solid var(--secondary-color);
    outline: 1px solid var(--secondary-color);
  }

  &:focus&:invalid {
    border: 1px solid var(--tertiary-color);
    outline: 1px solid var(--tertiary-color);
  }
`;

const SendCopy = () => {
  const inputId = "copy";
  return (
    <_SendCopy>
      <label htmlFor={inputId}>{FORM_SEND_COPY_LABEL}</label>
      <input id={inputId} name={inputId} type="checkbox" />
    </_SendCopy>
  );
};

const _SendCopy = styled.div`
  text-align: center;
`;

const SubmitButton = () => {
  return (
    <SubmitButtonContainer>
      <Button type="submit">{FORM_SUBMIT_BUTTON_LABEL}</Button>
    </SubmitButtonContainer>
  );
};

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: max-content;

  padding: 8px 12px;
  font-size: medium;

  border-radius: 8px;
  border: 0px;
  background-color: var(--primary-color);
  color: white;

  &:hover {
    background-color: var(--secondary-color);
  }
`;

const ContactMethods = () => {
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();
  const phoneUrl = `tel:${PHONE_NUMBER}`;
  const emailUrl = `mailto:${EMAIL_ADDRESS}`;

  return (
    <ContactDetails>
      <Header text={CONTACT_DETAILS_HEADER} center={true} />
      <p>
        {EMAIL_LABEL}&nbsp;
        <CustomLink
          target="_blank"
          href={emailUrl}
          onClick={() => sendLinkClickedEvent(emailUrl)}
        >
          {EMAIL_ADDRESS}
        </CustomLink>
      </p>
      <p>
        {PHONE_LABEL}&nbsp;
        <CustomLink
          target="_blank"
          href={phoneUrl}
          onClick={() => sendLinkClickedEvent(phoneUrl)}
        >
          {PHONE_NUMBER}
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
  const isMobile = useMobileDetection();
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
