"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type CustomIconProps = {
  icon: string | IconDefinition;
};

const CustomIcon = ({ icon }: CustomIconProps) => {
  // @ts-ignore
  return <_CustomIcon icon={icon} />;
};

export default CustomIcon;

const _CustomIcon = styled(FontAwesomeIcon)`
  width: 24px;
`;
