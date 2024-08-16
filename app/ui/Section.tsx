import { useContext } from "react";
import styled from "styled-components";
import { MobileDetectionContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";

const Section = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(MobileDetectionContext);
  return <_Section $isMobile={isMobile}>{children}</_Section>;
};

export default Section;

const _Section = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "4px" : "8px")};

  width: ${(props) => (props.$isMobile ? "calc(100% - 16px)" : "64%")};
  margin: 0px auto;
`;
