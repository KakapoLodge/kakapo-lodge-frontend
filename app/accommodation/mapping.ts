import { DEFAULT_RATES } from "./content";
import { AccommodationNameId, AllRates, LHRate, LHRatePlanDate } from "./types";

export const mapResponse = (rates: LHRate[]): AllRates => {
  const rate = rates[0];
  const ratePlans = rate["rate_plans"];

  const allRates = structuredClone(DEFAULT_RATES);

  for (const ratePlan of ratePlans) {
    if (!(ratePlan.name in ACCOMMODATION_NAME_ID_MAP)) {
      continue;
    }

    const nameId = ACCOMMODATION_NAME_ID_MAP[ratePlan.name];
    const rates = allRates[nameId];

    const ratePlanDates = ratePlan["rate_plan_dates"];
    rates.price = calculateTotalPrice(ratePlanDates);

    const maxAvailable = MAX_AVAILABLE[nameId];
    rates.overallAvailable = calculateOverallAvailable(
      ratePlanDates,
      maxAvailable,
    );

    rates.overallMinStay = calculateOverallMinStay(ratePlanDates);
    rates.isForSale = checkIsForSale(ratePlanDates);
  }

  return allRates;
};

const calculateTotalPrice = (ratePlanDates: LHRatePlanDate[]) => {
  return ratePlanDates
    .map((ratePlanDate) => ratePlanDate.rate)
    .reduce((total, rate) => total + rate, 0);
};

const calculateOverallAvailable = (
  ratePlanDates: LHRatePlanDate[],
  maxAvailable: number,
) => {
  return ratePlanDates
    .map((ratePlanDate) => ratePlanDate.available)
    .reduce(
      (overallAvailable, available) => Math.min(overallAvailable, available),
      maxAvailable,
    );
};

const calculateOverallMinStay = (ratePlanDates: LHRatePlanDate[]) => {
  return ratePlanDates
    .map((ratePlanDate) => ratePlanDate["min_stay"])
    .reduce((overallMinStay, minStay) => Math.max(overallMinStay, minStay), 1);
};

const checkIsForSale = (ratePlanDates: LHRatePlanDate[]) => {
  return !ratePlanDates
    .map((ratePlanDate) => ratePlanDate["stop_online_sell"])
    .reduce((overallStop, stopNight) => overallStop || stopNight, false);
};

const MAX_AVAILABLE = {
  "5-bed-dorm": 10,
  "4-bed-dorm": 4,
  "private-double": 5,
  "private-twin": 3,
  "family-room": 1,
  "double-ensuite": 2,
  "deluxe-double-ensuite": 1,
  "motel-unit": 1,
};

const ACCOMMODATION_NAME_ID_MAP: { [name: string]: AccommodationNameId } = {
  "5 Bed Dorm": "5-bed-dorm",
  "4 Bed Female Dorm": "4-bed-dorm",
  "Private Double": "private-double",
  "Private Twin": "private-twin",
  "Family Room": "family-room",
  "Double Ensuite": "double-ensuite",
  "Deluxe Double Ensuite": "deluxe-double-ensuite",
  Motel: "motel-unit",
};
