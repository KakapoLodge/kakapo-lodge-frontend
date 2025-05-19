import { useMobileDetection } from "@/app/.lib/hooks/useMobileDetection";
import { IsMobileProps } from "@/app/.lib/types";
import styled from "styled-components";

type SectionProps = {
  children?: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
  const isMobile = useMobileDetection();
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
