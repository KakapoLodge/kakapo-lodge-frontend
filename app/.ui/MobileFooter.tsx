import { useGoogleAnalyticsEvents } from "@/app/.lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "@/app/.lib/hooks/useMobileDetection";
import BookDirectButton from "@/app/.ui/BookDirectButton";
import CustomIcon from "@/app/.ui/CustomIcon";
import { PHONE_NUMBER } from "@/app/contact/content";
import { CALL_US_TEXT } from "@/app/content";
import Link from "next/link";
import styled from "styled-components";

const MobileFooter = () => {
  const isMobile = useMobileDetection();

  return isMobile ? (
    <BottomBar>
      <CallButton />
      <BookDirectButton isFooter />
    </BottomBar>
  ) : (
    <></>
  );
};

export default MobileFooter;

const BottomBar = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  padding: 8px 0px;

  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  z-index: 1001;

  border-radius: 12px 12px 0px 0px;
  border-top: 1px solid #8c9b3e50;

  background-color: white;
  box-shadow: 0px -4px 20px 0px rgba(0, 64, 0, 0.1);
`;

const CallButton = () => {
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();
  const url = `tel:${PHONE_NUMBER}`;

  return (
    <Button
      target="_blank"
      href={url}
      onClick={() => sendLinkClickedEvent(url)}
    >
      <CustomIcon icon="fa-phone" />
      {CALL_US_TEXT}
    </Button>
  );
};

const Button = styled(Link)`
  background-color: var(--primary-color);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin: 0px;
  padding: 6px 0px;

  width: 30%;
  height: 32px;
  border-radius: 8px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;
