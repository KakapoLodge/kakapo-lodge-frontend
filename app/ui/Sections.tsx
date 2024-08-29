import styled from "styled-components";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { IsMobileProps } from "../lib/types";

type SectionsProps = {
  children?: React.ReactNode;
};

const Sections = ({ children }: SectionsProps) => {
  const isMobile = useMobileDetection();
  return <_Sections $isMobile={isMobile}>{children}</_Sections>;
};

export default Sections;

const _Sections = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "16px" : "24px")};
`;
