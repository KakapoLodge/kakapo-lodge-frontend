import Link from "next/link";
import styled from "styled-components";
import { useGoogleAnalyticsEvents } from "../lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import BookDirectButton from "./BookDirectButton";
import CustomIcon from "./CustomIcon";

const Footer = () => {
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

export default Footer;

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
  const url = "tel:+64 03 315 7472";

  return (
    <Button
      target="_blank"
      href={url}
      onClick={() => sendLinkClickedEvent(url)}
    >
      <CustomIcon icon="fa-phone" />
      Call Us
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
