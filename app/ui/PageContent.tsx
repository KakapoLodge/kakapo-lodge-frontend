"use client";
import styled from "styled-components";
import { IsMobileProps } from "../types";
import { useContext } from "react";
import { IsMobileContext } from "../context";

const PageContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <StyledPageContent $isMobile={isMobile}>{children}</StyledPageContent>;
};

export default PageContent;

const StyledPageContent = styled.main<IsMobileProps>`
  margin-bottom: ${(props) => (props.$isMobile ? "72px" : "16px")};
`;

export const PageTitle = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <StyledPageTitle $isMobile={isMobile}>{children}</StyledPageTitle>;
};

const StyledPageTitle = styled.h1<IsMobileProps>`
  text-align: center;
  font-size: ${(props) => (props.$isMobile ? "x-large" : "xx-large")};
  font-weight: 500;
  padding: ${(props) => (props.$isMobile ? "10px 0px" : "16px 0px")};
`;
