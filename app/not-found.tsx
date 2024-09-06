"use client";

import Link from "next/link";
import styled from "styled-components";
import {
  HOME_URL,
  NOT_FOUND_ERROR_TEXT,
  NOT_FOUND_PAGE_TITLE,
  RETURN_HOME_TEXT,
} from "./content";
import { useGoogleAnalyticsEvents } from "./lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "./lib/hooks/useMobileDetection";
import { IsMobileProps } from "./lib/types";
import Footer from "./ui/Footer";
import NavBar from "./ui/NavBar";
import Page from "./ui/Page";
import PageContent from "./ui/PageContent";
import PageTitle from "./ui/PageTitle";

const NotFoundPage = () => {
  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={NOT_FOUND_PAGE_TITLE} />
        <Container>
          <Text>{NOT_FOUND_ERROR_TEXT}</Text>
          <ReturnHomeButton />
        </Container>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  height: calc(100vh - 200px);
`;

const Text = styled.p`
  text-align: center;
  margin: 0px 32px;
`;

const ReturnHomeButton = () => {
  const isMobile = useMobileDetection();
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();

  return (
    <_ReturnHomeButton
      href={HOME_URL}
      onClick={() => sendLinkClickedEvent(HOME_URL)}
      $isMobile={isMobile}
    >
      {RETURN_HOME_TEXT}
    </_ReturnHomeButton>
  );
};

const _ReturnHomeButton = styled(Link)<IsMobileProps>`
  background-color: var(--primary-color);
  color: white;

  padding: 8px 16px;
  border-radius: 8px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;
