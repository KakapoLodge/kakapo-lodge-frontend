import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";

type HeaderProps = {
  text: string;
  center?: boolean;
};

const Header = ({ text, center = false }: HeaderProps) => {
  const isMobile = useContext(IsMobileContext);
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
