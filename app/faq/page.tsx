"use client";

import Footer from "../ui/Footer";
import NavBar from "../ui/NavBar";
import Page from "../ui/Page";
import PageContent from "../ui/PageContent";
import PageTitle from "../ui/PageTitle";
import Section from "../ui/Section";
import Sections from "../ui/Sections";
import Subheader from "../ui/Subheader";
import {
  FAQ_PAGE_TITLE,
  FREQUENTLY_ASKED_QUESTIONS,
  NO_ANSWER_SUBHEADER,
  NO_ANSWER_TEXT,
} from "./content";

const FAQPage = () => {
  return (
    <Page>
      <NavBar />
      <PageContent>
        <PageTitle text={FAQ_PAGE_TITLE} />
        <FrequentlyAskedQuestions />
      </PageContent>
      <Footer />
    </Page>
  );
};

export default FAQPage;

const FrequentlyAskedQuestions = () => {
  return (
    <Sections>
      {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => (
        <Section key={`faq-${index}`}>
          <Subheader>{faq.question}</Subheader>
          <AnswerParagraphs paragraphs={faq.answerParagraphs} />
        </Section>
      ))}

      <Section>
        <Subheader>{NO_ANSWER_SUBHEADER}</Subheader>
        <p>{NO_ANSWER_TEXT}</p>
      </Section>
    </Sections>
  );
};

type AnswerParagraphsProps = {
  paragraphs: string[];
};

const AnswerParagraphs = ({ paragraphs }: AnswerParagraphsProps) => {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={`faq-answer-paragraph-${index}`}>{paragraph}</p>
      ))}
    </>
  );
};
