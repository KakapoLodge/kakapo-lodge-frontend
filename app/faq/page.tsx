"use client";

import Footer from "@/app/.ui/Footer";
import ImageCarousel from "@/app/.ui/ImageCarousel";
import MobileFooter from "@/app/.ui/MobileFooter";
import NavBar from "@/app/.ui/NavBar";
import Page from "@/app/.ui/Page";
import PageContent from "@/app/.ui/PageContent";
import PageTitle from "@/app/.ui/PageTitle";
import Section from "@/app/.ui/Section";
import Sections from "@/app/.ui/Sections";
import Subheader from "@/app/.ui/Subheader";
import {
  FAQ_PAGE_TITLE,
  FREQUENTLY_ASKED_QUESTIONS,
  NO_ANSWER_SUBHEADER,
  NO_ANSWER_TEXT,
} from "@/app/faq/content";

const FAQPage = () => {
  return (
    <Page>
      <NavBar />

      <PageContent>
        <PageTitle text={FAQ_PAGE_TITLE} />
        <Sections>
          <FrequentlyAskedQuestions />

          <Section>
            <Subheader>{NO_ANSWER_SUBHEADER}</Subheader>
            <p>{NO_ANSWER_TEXT}</p>
          </Section>
        </Sections>

        <Footer />
      </PageContent>

      <MobileFooter />
    </Page>
  );
};

export default FAQPage;

const FrequentlyAskedQuestions = () => {
  return (
    <>
      {FREQUENTLY_ASKED_QUESTIONS.map((faq, index) => (
        <Section key={`faq-${index}`}>
          <Subheader>{faq.question}</Subheader>
          <AnswerParagraphs paragraphs={faq.answerParagraphs} />
          {faq.imagePaths ? (
            <ImageCarousel
              description={faq.question}
              imagePaths={faq.imagePaths}
            />
          ) : (
            <></>
          )}
        </Section>
      ))}
    </>
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
