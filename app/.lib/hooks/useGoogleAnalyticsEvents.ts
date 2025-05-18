import { sendGAEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

export const useGoogleAnalyticsEvents = () => {
  const pathname = usePathname();

  const sendAccommodationFilteredEvent = (filterId: string) =>
    sendGAEvent("event", "filtered_accommodation", { filter: filterId });

  const sendDatesPickedEvent = (checkIn: string, checkOut: string) =>
    sendGAEvent("event", "picked_dates", { checkIn, checkOut });

  const sendLinkClickedEvent = (url: string) =>
    sendGAEvent("event", "clicked_link", { from: pathname, to: url });

  return {
    sendAccommodationFilteredEvent,
    sendDatesPickedEvent,
    sendLinkClickedEvent,
  };
};
