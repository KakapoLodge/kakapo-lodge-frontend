"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type CustomIconProps = {
  iconName: string;
};

const CustomIcon = ({ iconName }: CustomIconProps) => {
  // @ts-ignore
  return <_CustomIcon icon={iconName} />;
};

export default CustomIcon;

const _CustomIcon = styled(FontAwesomeIcon)`
  width: 24px;
`;
