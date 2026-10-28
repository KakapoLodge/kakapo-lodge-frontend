import { useIconLibrary } from "@/app/.lib/hooks/useIconLibrary";
import { usePrefetchTonightsRates } from "@/app/.lib/hooks/usePrefetchTonightsRates";

type PageProps = {
  children?: React.ReactNode;
};

const Page = ({ children }: PageProps) => {
  useIconLibrary();
  usePrefetchTonightsRates();

  return <>{children}</>;
};

export default Page;
