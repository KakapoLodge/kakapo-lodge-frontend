export const mapResponse = (rates: Rate[]): RatePlansMap => {
  const rate = rates[0];
  const ratePlans = rate["rate_plans"];

  const ratePlansMap = DEFAULT_RATE_PLANS_MAP;

  for (const ratePlan of ratePlans) {
    if (!(ratePlan.name in ACCOMMODATION_NAME_ID_MAP)) {
      continue;
    }

    const nameId = ACCOMMODATION_NAME_ID_MAP[ratePlan.name];
    ratePlansMap[nameId] = ratePlan;
  }

  return ratePlansMap;
};

type Rate = {
  name: string;
  rate_plans: RatePlan[];
};

type RatePlan = {
  id: number;
  name: string;
  rate_plan_dates: RatePlanDate[];
};

type RatePlanDate = {
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

const ACCOMMODATION_NAME_ID_MAP: { [name: string]: string } = {
  "5 Bed Dorm": "5-bed-dorm",
  "Private Double": "private-double",
  "Private Twin": "private-twin",
  "Family Room": "family-room",
  "Double Ensuite": "double-ensuite",
  "Deluxe Double Ensuite": "deluxe-double-ensuite",
  Motel: "motel-unit",
};

export type RatePlansMap = { [nameId: string]: RatePlan };

const DEFAULT_RATE_PLANS_MAP: RatePlansMap = {
  "5-bed-dorm": {
    id: 9239,
    name: "5 Bed Dorm",
    rate_plan_dates: [
      {
        available: 5,
        close_to_arrival: false,
        close_to_departure: false,
        date: "",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 45,
        stop_online_sell: false,
      },
    ],
  },
  "4-bed-dorm": {
    id: 9238,
    name: "4 Bed Female Dorm",
    rate_plan_dates: [
      {
        available: 4,
        close_to_arrival: false,
        close_to_departure: false,
        date: "",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 50,
        stop_online_sell: false,
      },
    ],
  },
  "private-double": {
    id: 9243,
    name: "Private Double",
    rate_plan_dates: [
      {
        available: 5,
        close_to_arrival: false,
        close_to_departure: false,
        date: "2024-08-15",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 90,
        stop_online_sell: false,
      },
    ],
  },
  "private-twin": {
    id: 9244,
    name: "Private Twin",
    rate_plan_dates: [
      {
        available: 3,
        close_to_arrival: false,
        close_to_departure: false,
        date: "2024-08-15",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 96,
        stop_online_sell: false,
      },
    ],
  },
  "family-room": {
    id: 9245,
    name: "Family Room",
    rate_plan_dates: [
      {
        available: 1,
        close_to_arrival: false,
        close_to_departure: false,
        date: "2024-08-15",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 120,
        stop_online_sell: false,
      },
    ],
  },
  "double-ensuite": {
    id: 9242,
    name: "Double Ensuite",
    rate_plan_dates: [
      {
        available: 1,
        close_to_arrival: false,
        close_to_departure: false,
        date: "2024-08-15",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 110,
        stop_online_sell: false,
      },
    ],
  },
  "deluxe-double-ensuite": {
    id: 73051,
    name: "Deluxe Double Ensuite",
    rate_plan_dates: [
      {
        available: 1,
        close_to_arrival: false,
        close_to_departure: false,
        date: "2024-08-15",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 120,
        stop_online_sell: false,
      },
    ],
  },
  "motel-unit": {
    id: 9240,
    name: "Motel",
    rate_plan_dates: [
      {
        available: 1,
        close_to_arrival: false,
        close_to_departure: false,
        date: "2024-08-15",
        id: null,
        max_stay: null,
        min_stay: 1,
        rate: 140,
        stop_online_sell: false,
      },
    ],
  },
};
