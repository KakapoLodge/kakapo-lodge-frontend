import { useContext } from "react";
import styled from "styled-components";
import { IsMobileContext } from "../lib/context";
import { IsMobileProps } from "../lib/types";

type HeaderProps = {
  text: string;
};

const Header = ({ text }: HeaderProps) => {
  const isMobile = useContext(IsMobileContext);
  return <_Header $isMobile={isMobile}>{text}</_Header>;
};

export default Header;

const _Header = styled.h2<IsMobileProps>`
  font-size: ${(props) => (props.$isMobile ? "larger" : "x-large")};
`;
