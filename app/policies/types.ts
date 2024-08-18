export type Policy = {
  nameId: string;
  name: string;
  paragraphs: string[];
};

export type HouseRules = {
  nameId: string;
  name: string;
  notice: string;
  introduction: string;
  noBookingRules: RulesGrouping;
  noBookingFinalWarning: string;
  nonComplianceRules: RulesGrouping;
  bookingRules: RulesGrouping;
  endingStatement: string;
  signOff: string;
};

export type RulesGrouping = {
  nameId: string;
  ruleGroupHeader: string;
  rules: string[];
};
