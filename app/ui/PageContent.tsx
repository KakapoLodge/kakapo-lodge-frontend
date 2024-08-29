import { usePathname } from "next/navigation";
import styled from "styled-components";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";

type PageContentProps = {
  children?: React.ReactNode;
};

const PageContent = ({ children }: PageContentProps) => {
  const isMobile = useMobileDetection();

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
