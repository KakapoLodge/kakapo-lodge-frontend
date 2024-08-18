import { HouseRules, Policy } from "./types";

export const PAGE_TITLE = "Policies";

export const PAYMENT_POLICY: Policy = {
  nameId: "payment-policy",
  name: "Payment Policy",
  paragraphs: [
    "A valid credit card is required to secure all bookings. If the provided credit card details are invalid, your booking will be automatically cancelled.",
    "A deposit equivalent to the cost of the first night will be charged upon confirmation of the booking. The remaining balance will be deducted from your card within 48 hours prior to arrival.",
  ],
};

export const CANCELLATION_POLICY: Policy = {
  nameId: "cancellation-policy",
  name: "Cancellation Policy",
  paragraphs: [
    "Guests can cancel free of charge up to 3 days before arrival. Cancellations made after this period may result in a charge equivalent to the cost of the first night’s accommodation.",
    "For group bookings, the cancellation policy will be provided at the time of booking.",
  ],
};

export const HOUSE_RULES: HouseRules = {
  nameId: "house-rules",
  name: "House Rules",
  notice: "Important Information: Please Read Before Booking",
  introduction:
    "Before confirming your reservation, please review our guidelines to ensure that Kakapo Lodge aligns with your expectations. Non-compliance with the following regulations will result in non-refundable charges and immediate eviction. These rules are strictly enforced.",
  noBookingRules: {
    nameId: "no-booking-rules",
    ruleGroupHeader: "Please Refrain from Booking If",
    rules: [
      "You plan to host an event with significant alcohol consumption, such as birthdays, rugby events, or bachelor/bachelorette parties. While alcohol is permitted, it must adhere to our 10 PM curfew.",
      "You anticipate a lively or disruptive party atmosphere during your stay.",
      "You intend to provide inaccurate information regarding the number of guests checking in.",
      "You plan to host an all-night, disruptive party.",
      "Your behavior is likely to be loud and disruptive, disturbing other guests.",
      "You cannot provide valid ID or credit card details upon request.",
      "You intend to play loud music during your stay.",
    ],
  },
  noBookingFinalWarning:
    "We strive to maintain a peaceful and relaxing environment for all guests. Disruptive behavior will not be tolerated.",
  nonComplianceRules: {
    nameId: "non-compliance-rules",
    ruleGroupHeader: "Failure to Comply",
    rules: [
      "Non-compliance with these rules will result in immediate eviction, and you will be prohibited from re-booking in the future.",
    ],
  },
  bookingRules: {
    nameId: "booking-rules",
    ruleGroupHeader: "Please Book If",
    rules: ["None of the aforementioned conditions apply to you."],
  },
  endingStatement:
    "We appreciate your understanding and cooperation in maintaining a harmonious environment for all guests. Should you have any questions or concerns, please feel free to contact us before making your reservation.",
  signOff: "Thank you for considering Kakapo Lodge for your stay.",
};
