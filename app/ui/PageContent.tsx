"use client";

import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";

const PageContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_PageContent $isMobile={isMobile}>{children}</_PageContent>;
};

export default PageContent;

const _PageContent = styled.main<IsMobileProps>`
  margin-bottom: ${(props) => (props.$isMobile ? "72px" : "16px")};
`;

export const PageTitle = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_PageTitle $isMobile={isMobile}>{children}</_PageTitle>;
};

const _PageTitle = styled.h1<IsMobileProps>`
  text-align: center;
  font-size: ${(props) => (props.$isMobile ? "x-large" : "xx-large")};
  font-weight: 500;
  padding: ${(props) => (props.$isMobile ? "10px 0px" : "16px 0px")};
`;
