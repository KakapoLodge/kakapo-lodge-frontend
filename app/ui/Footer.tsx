import styled from "styled-components";
import { BUILT_BY_TEXT, BUILT_BY_URL, COPYRIGHT_TEXT } from "../content";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { IsMobileProps } from "../lib/types";
import CustomLink from "./CustomLink";

const Footer = () => {
  const isMobile = useMobileDetection();
  return (
    <_Footer $isMobile={isMobile}>
      <small>
        {COPYRIGHT_TEXT}&nbsp;&nbsp;•&nbsp;&nbsp;
        <CustomLink target="_blank" href={BUILT_BY_URL}>
          {BUILT_BY_TEXT}
        </CustomLink>
      </small>
    </_Footer>
  );
};

export default Footer;

const _Footer = styled.footer<IsMobileProps>`
  display: flex;
  justify-content: center;

  border-top: 1px solid #8c9b3e40;
  padding: ${(props) => (props.$isMobile ? "20px" : "32px")};
`;
