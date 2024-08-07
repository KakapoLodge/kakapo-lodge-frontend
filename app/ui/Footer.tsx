"use client";
import styled from "styled-components";
import BookDirectButton from "./BookDirectButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IsMobileContext } from "../context";
import { useIsMobile } from "../hooks";

const Footer = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <IsMobileContext.Provider value={isMobile}>
      <BottomBar>
        <CallButton />
        <BookDirectButton isFooter />
      </BottomBar>
    </IsMobileContext.Provider>
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
  z-index: 2;

  border-radius: 12px 12px 0px 0px;
  border-top: 1px solid #8c9b3e50;

  background-color: white;
  box-shadow: 0px -4px 20px 0px rgba(0, 64, 0, 0.1);
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
