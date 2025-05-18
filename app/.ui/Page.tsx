import { useIconLibrary } from "../lib/hooks/useIconLibrary";
import { usePrefetchTonightsRates } from "../lib/hooks/usePrefetchTonightsRates";

type PageProps = {
  children?: React.ReactNode;
};

const Page = ({ children }: PageProps) => {
  useIconLibrary();
  usePrefetchTonightsRates();

  return <>{children}</>;
};

export default Page;
