import { useMobileDetection } from "@/app/.lib/hooks/useMobileDetection";
import { usePathname } from "next/navigation";
import styled from "styled-components";

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
  margin-bottom: ${(props) => (props.$largerBottomMargin ? "60px" : "0px")};
`;
