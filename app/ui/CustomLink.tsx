import Link from "next/link";
import styled from "styled-components";

type CustomLinkProps = {
  $isSelected?: boolean;
};

const CustomLink = styled(Link)<CustomLinkProps>`
  display: flex;
  justify-content: center;

  color: ${(props) =>
    props.$isSelected ? "var(--secondary-color)" : "var(--primary-color)"};

  pointer-events: ${(props) => (props.$isSelected ? "none" : "auto")};

  &:hover {
    text-decoration: ${(props) => (props.$isSelected ? "none" : "underline")};
  }
`;

export default CustomLink;
