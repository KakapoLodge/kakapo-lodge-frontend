"use client";

import Footer from "@/app/.ui/Footer";
import Header from "@/app/.ui/Header";
import MobileFooter from "@/app/.ui/MobileFooter";
import NavBar from "@/app/.ui/NavBar";
import Page from "@/app/.ui/Page";
import PageContent from "@/app/.ui/PageContent";
import PageTitle from "@/app/.ui/PageTitle";
import Section from "@/app/.ui/Section";
import Sections from "@/app/.ui/Sections";
import {
  CANCELLATION_POLICY,
  HOUSE_RULES,
  PAYMENT_POLICY,
  POLICIES_PAGE_TITLE,
} from "@/app/policies/content";
import { Policy, RulesGrouping } from "@/app/policies/types";

const PoliciesPage = () => {
  return (
    <Page>
      <NavBar />

      <PageContent>
        <PageTitle text={POLICIES_PAGE_TITLE} />

        <Sections>
          <PolicySection policy={PAYMENT_POLICY} />
          <PolicySection policy={CANCELLATION_POLICY} />
          <HouseRulesSection />
        </Sections>

        <Footer />
      </PageContent>

      <MobileFooter />
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
