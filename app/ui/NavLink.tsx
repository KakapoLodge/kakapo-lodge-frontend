"use client";

import Link from "next/link";
import styled from "styled-components";

type NavLinkProps = {
  $isSelected?: boolean;
};

const NavLink = styled(Link)<NavLinkProps>`
  color: ${(props) =>
    props.$isSelected ? "var(--secondary-color)" : "var(--primary-color)"};

  pointer-events: ${(props) => (props.$isSelected ? "none" : "auto")};

  &:hover {
    text-decoration: ${(props) => (props.$isSelected ? "none" : "underline")};
  }
`;

export default NavLink;
