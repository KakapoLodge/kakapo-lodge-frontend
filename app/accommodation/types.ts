export type AccommodationNameId =
  | "5-bed-dorm"
  | "4-bed-dorm"
  | "private-double"
  | "private-twin"
  | "family-room"
  | "double-ensuite"
  | "deluxe-double-ensuite"
  | "motel-unit";

export type Feature = {
  icon: string;
  description: string;
};

export type AllRates = { [nameId in AccommodationNameId]: Rates };

export type Rates = {
  price: number;
  overallAvailable: number | null;
  overallMinStay: number | null;
  isForSale: boolean;
};

export type LHRate = {
  name: string;
  rate_plans: LHRatePlan[];
};

type LHRatePlan = {
  id: number;
  name: string;
  rate_plan_dates: LHRatePlanDate[];
};

export type LHRatePlanDate = {
  available: number;
  close_to_arrival: boolean;
  close_to_departure: boolean;
  date: string;
  id: number | null;
  max_stay: number | null;
  min_stay: number;
  rate: number;
  stop_online_sell: boolean;
};
