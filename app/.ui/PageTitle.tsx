import { useMobileDetection } from "@/app/.lib/hooks/useMobileDetection";
import { IsMobileProps } from "@/app/.lib/types";
import styled from "styled-components";

type PageTitleProps = {
  text: string;
};

const PageTitle = ({ text }: PageTitleProps) => {
  const isMobile = useMobileDetection();
  return <_PageTitle $isMobile={isMobile}>{text}</_PageTitle>;
};

export default PageTitle;

const _PageTitle = styled.h1<IsMobileProps>`
  text-align: center;
  font-size: ${(props) => (props.$isMobile ? "x-large" : "xx-large")};
  font-weight: 500;
  padding: ${(props) => (props.$isMobile ? "10px 0px" : "16px 0px")};
`;
