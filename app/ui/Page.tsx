import { MobileDetectionContext } from "../lib/context";
import { getTodaysDateRfc3339 } from "../lib/dates";
import { useIconLibrary } from "../lib/hooks/useIconLibrary";
import { useImmediatePrefetch } from "../lib/hooks/useImmediatePrefetch";
import { useMobileDetection } from "../lib/hooks/useMobileDetection";

const Page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useIconLibrary();

  const todaysDateRfc3339 = getTodaysDateRfc3339();
  useImmediatePrefetch("getRates", {
    start_date: todaysDateRfc3339,
    end_date: todaysDateRfc3339,
  });

  const isMobile = useMobileDetection();

  return (
    <MobileDetectionContext.Provider value={isMobile}>
      {children}
    </MobileDetectionContext.Provider>
  );
};

export default Page;
