import { useContext } from "react";
import styled from "styled-components";
import { MobileDetectionContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";

type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => {
  const isMobile = useContext(MobileDetectionContext);
  return <_PageTitle $isMobile={isMobile}>{text}</_PageTitle>;
};

export default PageTitle;

const _PageTitle = styled.h1<IsMobileProps>`
  text-align: center;
  font-size: ${(props) => (props.$isMobile ? "x-large" : "xx-large")};
  font-weight: 500;
  padding: ${(props) => (props.$isMobile ? "10px 0px" : "16px 0px")};
`;
