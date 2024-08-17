import { usePathname } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";
import { MobileDetectionContext } from "../lib/context";

const PageContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useContext(MobileDetectionContext);

  const pathname = usePathname();
  const isAccommodationPage = pathname.includes("accommodation");

  return (
    <_PageContent $largerBottomMargin={isMobile && !isAccommodationPage}>
      {children}
    </_PageContent>
  );
};

export default PageContent;

type _PageContentProps = {
  $largerBottomMargin: boolean;
};

const _PageContent = styled.main<_PageContentProps>`
  margin-bottom: ${(props) => (props.$largerBottomMargin ? "72px" : "16px")};
`;
