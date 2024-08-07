"use client";
import styled from "styled-components";
import BookDirectButton from "./BookDirectButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <BottomBar>
        <CallButton />
      <BookDirectButton isMobile />
    </BottomBar>
  );
};

export default Footer;

const BottomBar = styled.footer`
  display: none;

  padding: 8px 0px;
  justify-content: space-evenly;
  align-items: center;

  position: fixed;
  left: 0px;
  bottom: 0px;
  width: 100%;
  z-index: 2;

  border-radius: 12px 12px 0px 0px;
  border-top: 1px solid #8c9b3e50;

  background-color: white;
  box-shadow: 0px -4px 20px 0px rgba(0, 64, 0, 0.1);

  @media (width < 800px) {
    display: flex;
  }
`;

const CallButton = () => {
  return (
    <Button target="_blank" href="tel:03 315 7472">
      <FontAwesomeIcon icon={faPhone} />
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
