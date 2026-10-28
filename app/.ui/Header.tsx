import { useMobileDetection } from "@/app/.lib/hooks/useMobileDetection";
import { IsMobileProps } from "@/app/.lib/types";
import styled from "styled-components";

type HeaderProps = {
  text: string;
  center?: boolean;
};

const Header = ({ text, center = false }: HeaderProps) => {
  const isMobile = useMobileDetection();
  return (
    <_Header $isMobile={isMobile} $center={center}>
      {text}
    </_Header>
  );
};

export default Header;

const _Header = styled.h2<IsMobileProps & { $center: boolean }>`
  font-weight: 500;
  font-size: ${(props) => (props.$isMobile ? "larger" : "x-large")};
  text-align: ${(props) => (props.$center ? "center" : "start")};
`;
