import { MobileDetectionContext } from "../lib/context";
import { useIconLibrary } from "../lib/hooks/useIconLibrary";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";
import { usePrefetchTonightsRates } from "../lib/hooks/usePrefetchTonightsRates";

const Page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useIconLibrary();
  usePrefetchTonightsRates();

  const isMobile = useMobileDetection();
  return (
    <MobileDetectionContext.Provider value={isMobile}>
      {children}
    </MobileDetectionContext.Provider>
  );
};

export default Page;
