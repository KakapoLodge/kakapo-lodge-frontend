import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";

const Sections = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(IsMobileContext);
  return <_Sections $isMobile={isMobile}>{children}</_Sections>;
};

export default Sections;

const _Sections = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "12px" : "16px")};
`;
