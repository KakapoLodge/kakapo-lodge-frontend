"use client";

import Footer from "../ui/Footer";
import Header from "../ui/Header";
import NavBar from "../ui/NavBar";
import Page from "../ui/Page";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import Section from "../ui/Section";
import Sections from "../ui/Sections";
import {
  CANCELLATION_POLICY,
  HOUSE_RULES,
  PAGE_TITLE,
  PAYMENT_POLICY,
} from "./content";
import { Policy, RulesGrouping } from "./types";

const PoliciesPage = () => {
  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={PAGE_TITLE} />

        <Sections>
          <PolicySection policy={PAYMENT_POLICY} />
          <PolicySection policy={CANCELLATION_POLICY} />
          <HouseRulesSection />
        </Sections>
      </PageContent>
      <Footer />
    </Page>
  );
};

export default PoliciesPage;

type PolicySectionProps = {
  policy: Policy;
};

const PolicySection = ({ policy }: PolicySectionProps) => {
  return (
    <Section>
      <Header text={policy.name} />
      {policy.paragraphs.map((paragraph, index) => (
        <p key={`${policy.nameId}-paragraph-${index}`}>{paragraph}</p>
      ))}
    </Section>
  );
};

const HouseRulesSection = () => {
  return (
    <Section>
      <Header text={HOUSE_RULES.name} />

      <b>{HOUSE_RULES.notice}</b>
      <p>{HOUSE_RULES.introduction}</p>

      <RuleGroup rulesGrouping={HOUSE_RULES.noBookingRules} />
      <p>{HOUSE_RULES.noBookingFinalWarning}</p>

      <RuleGroup rulesGrouping={HOUSE_RULES.nonComplianceRules} />
      <RuleGroup rulesGrouping={HOUSE_RULES.bookingRules} />

      <p>{HOUSE_RULES.endingStatement}</p>
      <b>{HOUSE_RULES.signOff}</b>
    </Section>
  );
};

type RulesGroupProps = {
  rulesGrouping: RulesGrouping;
};

const RuleGroup = ({ rulesGrouping }: RulesGroupProps) => {
  return (
    <>
      <b>{rulesGrouping.ruleGroupHeader}</b>
      <ul>
        {rulesGrouping.rules.map((rule, index) => (
          <li key={`${rulesGrouping.nameId}-rule-${index}`}>{rule}</li>
        ))}
      </ul>
    </>
  );
};
