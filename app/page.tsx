"use client";

import Image from "next/image";
import { ReactGoogleReview, ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import styled from "styled-components";
import {
  ACCOMMODATION_IMAGE_PATHS,
  ACCOMMODATION_NAMES,
  ACCOMMODATION_NAME_IDS,
} from "./accommodation/content";
import { AccommodationNameId } from "./accommodation/types";
import {
  ACCOMMODATION_SHORTCUTS_HEADER,
  BANNER_IMAGE_ALT_TEXT,
  BANNER_IMAGE_PATH,
  DESKTOP_GOOGLE_LOGO_PATH,
  FEATUREABLE_WIDGET_ID,
  GOOGLE_LOGO_ALT_TEXT,
  INTRODUCTION_PARAGRAPHS,
  LANDING_PAGE_TITLE,
  MOBILE_GOOGLE_LOGO_PATH,
  REVIEWS_HEADER,
  SHORTCUT_LINK_TEXT,
} from "./content";
import { useGoogleAnalyticsEvents } from "./lib/hooks/useGoogleAnalyticsEvents";
import { useMobileDetection } from "./lib/hooks/useMobileDetection";
import { IsMobileProps } from "./lib/types";
import Card from "./ui/Card";
import CarouselImage from "./ui/CarouselImage";
import CustomCarousel from "./ui/CustomCarousel";
import CustomIcon from "./ui/CustomIcon";
import CustomLink from "./ui/CustomLink";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import NavBar from "./ui/NavBar";
import Page from "./ui/Page";
import PageContent from "./ui/PageContent";
import PageTitle from "./ui/PageTitle";
import Section from "./ui/Section";
import Sections from "./ui/Sections";
import Subheader from "./ui/Subheader";

const LandingPage = () => {
  return (
    <Page>
      <NavBar />
      <LandingPageContent>
        <MainBanner />

        <PageTitle text={LANDING_PAGE_TITLE} />

        <Sections>
          <Introduction />
          <AccommodationShortcuts />
          <GoogleReviews />
        </Sections>
      </LandingPageContent>
      <Footer />
    </Page>
  );
};

export default LandingPage;

const LandingPageContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useMobileDetection();

  return (
    <_LandingPageContent $isMobile={isMobile}>{children}</_LandingPageContent>
  );
};

const _LandingPageContent = styled(PageContent)<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.$isMobile ? "16px" : "24px")};
`;

const MainBanner = () => {
  return (
    <BannerImage
      src={BANNER_IMAGE_PATH}
      alt={BANNER_IMAGE_ALT_TEXT}
      width={1621}
      height={855}
      priority
    />
  );
};

const BannerImage = styled(Image)`
  width: 100%;
  height: auto;
`;

const Introduction = () => {
  const isMobile = useMobileDetection();
  return (
    <_Introduction $isMobile={isMobile}>
      {INTRODUCTION_PARAGRAPHS.map((paragraph, index) => (
        <p key={`introduction-paragraph-${index}`}>{paragraph}</p>
      ))}
    </_Introduction>
  );
};

const _Introduction = styled.div<IsMobileProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: ${(props) => (props.$isMobile ? "0px 32px" : "0px 16vw")};
`;

const AccommodationShortcuts = () => {
  return (
    <Section>
      <Header text={ACCOMMODATION_SHORTCUTS_HEADER} center={true} />

      <CustomCarousel>
        {ACCOMMODATION_NAME_IDS.map((nameId) => (
          <AccommodationShortcut key={nameId} nameId={nameId} />
        ))}
      </CustomCarousel>
    </Section>
  );
};

type AccommodationShortcutProps = {
  nameId: AccommodationNameId;
};

const AccommodationShortcut = ({ nameId }: AccommodationShortcutProps) => {
  const imagePath = ACCOMMODATION_IMAGE_PATHS[nameId][0];
  const accommodationName = ACCOMMODATION_NAMES[nameId];

  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();
  const url = `/accommodation/#${nameId}`;

  return (
    <ShortcutCard>
      <CarouselImage imagePath={imagePath} description={accommodationName} />
      <Subheader>{accommodationName}</Subheader>
      <ShortcutLink href={url} onClick={() => sendLinkClickedEvent(url)}>
        {SHORTCUT_LINK_TEXT}&nbsp;
        <CustomIcon icon="fa-arrow-right" />
      </ShortcutLink>
    </ShortcutCard>
  );
};

const ShortcutCard = styled(Card)`
  gap: 4px;
`;

const ShortcutLink = styled(CustomLink)`
  color: var(--secondary-color);
`;

const GoogleReviews = () => {
  return (
    <Section>
      <Header text={REVIEWS_HEADER} center={true} />
      <ReactGoogleReviews
        layout="custom"
        featurableId={FEATUREABLE_WIDGET_ID}
        renderer={(reviews) => <Reviews reviews={reviews} />}
      />
    </Section>
  );
};

type ReviewsProps = {
  reviews: ReactGoogleReview[];
};

const Reviews = ({ reviews }: ReviewsProps) => {
  const isMobile = useMobileDetection();
  return (
    <Section>
      <ReviewsSummary reviews={reviews} />
      <CustomCarousel singleItem={true}>
        {reviews
          .filter((review) => filterReview(review, isMobile))
          .sort(compareReviewsByDate)
          .map((review) => (
            <Review key={`review-${review.reviewId}`} review={review} />
          ))}
      </CustomCarousel>
    </Section>
  );
};

type ReviewsSummaryProps = {
  reviews: ReactGoogleReview[];
};

const ReviewsSummary = ({ reviews }: ReviewsSummaryProps) => {
  const averageRating = getAverageRating(reviews);
  const { sendLinkClickedEvent } = useGoogleAnalyticsEvents();

  const googleReviewsUrl =
    "https://www.google.com/maps/place/Hanmer+Springs+Kakapo+Lodge/@-42.5258994,172.8285116,17z/data=!4m11!3m10!1s0x6d306383a372bc73:0x7424d96525465fe0!5m2!4m1!1i2!8m2!3d-42.5258994!4d172.8285116!9m1!1b1!16s%2Fg%2F1td6b1h1?entry=ttu";

  return (
    <_ReviewsSummary>
      <GoogleLogo />
      <ReviewsSummaryText>
        <AverageRating>Rating: {averageRating.toFixed(1)} / 5</AverageRating>
        <ReviewsLink
          target="_blank"
          href={googleReviewsUrl}
          onClick={() => sendLinkClickedEvent(googleReviewsUrl)}
        >
          View all {reviews.length} reviews
        </ReviewsLink>
      </ReviewsSummaryText>
    </_ReviewsSummary>
  );
};

const _ReviewsSummary = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  width: fit-content;

  margin: 0px auto;
  padding: 8px 16px;

  border: 1px solid #8c9b3e20;
  border-radius: 12px;
  box-shadow: 0px 2px 32px 2px rgba(0, 64, 0, 0.1);
`;

const getAverageRating = (reviews: ReactGoogleReview[]) => {
  const total = reviews
    .map((review) => review.starRating)
    .reduce((subtotal, rating) => subtotal + rating, 0);
  return total / reviews.length;
};

const GoogleLogo = () => {
  const isMobile = useMobileDetection();
  return isMobile ? (
    <_GoogleLogo
      src={MOBILE_GOOGLE_LOGO_PATH}
      alt={GOOGLE_LOGO_ALT_TEXT}
      loading="lazy"
      width={512}
      height={512}
      $isMobile={isMobile}
    />
  ) : (
    <_GoogleLogo
      src={DESKTOP_GOOGLE_LOGO_PATH}
      alt={GOOGLE_LOGO_ALT_TEXT}
      loading="lazy"
      width={512}
      height={300}
      $isMobile={isMobile}
    />
  );
};

const _GoogleLogo = styled(Image)<IsMobileProps>`
  width: ${(props) => (props.$isMobile ? "40px" : "170px")};
  height: ${(props) => (props.$isMobile ? "40px" : "60px")};
`;

const ReviewsSummaryText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  justify-content: center;
`;

const AverageRating = styled(Subheader)`
  font-size: larger;
`;

const ReviewsLink = styled(CustomLink)`
  color: var(--secondary-color);
`;

type ReviewProps = {
  review: ReactGoogleReview;
};

const Review = ({ review }: ReviewProps) => {
  return (
    <_Review key={review.reviewId}>
      <ReviewHeader review={review} />
      <Rating starRating={review.starRating} />
      <p>{review.comment}</p>
    </_Review>
  );
};

const _Review = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: calc(100% - 130px);
  min-height: 240px;

  margin: 0px auto;
  padding: 16px;

  border-top: 1px solid var(--secondary-color);
  border-bottom: 1px solid var(--secondary-color);
`;

type ReviewHeaderProps = {
  review: ReactGoogleReview;
};

const ReviewHeader = ({ review }: ReviewHeaderProps) => {
  const reviewer = review.reviewer;
  return (
    <_ReviewHeader>
      <ReviewerImage
        src={reviewer.profilePhotoUrl}
        alt={reviewer.displayName}
        loading="lazy"
        width={40}
        height={40}
      />
      <div>
        <Subheader>{review.reviewer.displayName}</Subheader>
        <ReviewDate updateTime={review.updateTime || ""} />
      </div>
    </_ReviewHeader>
  );
};

const ReviewerImage = styled(Image)`
  border-radius: 64px;
`;

const _ReviewHeader = styled.div`
  display: flex;
  gap: 8px;
`;

type ReviewDateProps = {
  updateTime: string;
};

const ReviewDate = ({ updateTime }: ReviewDateProps) => {
  const date = new Date(updateTime);
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <_ReviewDate>{`${date.getDate()} ${month} ${date.getFullYear()}`}</_ReviewDate>
  );
};

const _ReviewDate = styled.p`
  color: var(--secondary-color);
`;

type RatingProps = {
  starRating: number;
};

const Rating = ({ starRating }: RatingProps) => {
  return (
    <_Rating>
      {[...Array(starRating).keys()].map((index) => (
        <CustomIcon key={`star-${index}`} icon="fa-star" />
      ))}
    </_Rating>
  );
};

const _Rating = styled.div`
  color: gold;
`;

const filterReview = (review: ReactGoogleReview, isMobile: boolean) => {
  const reviewLength = review.comment.length;
  const minLength = isMobile ? 128 : 256;
  const maxLength = isMobile ? 256 : 512;

  return (
    !review.reviewer.isAnonymous &&
    review.starRating >= 5 &&
    review.reviewId !== null &&
    review.updateTime !== null &&
    reviewLength > minLength &&
    reviewLength <= maxLength
  );
};

const compareReviewsByDate = (
  review1: ReactGoogleReview,
  review2: ReactGoogleReview,
) => {
  const date1 = review1.updateTime ? Date.parse(review1.updateTime) : 0;
  const date2 = review2.updateTime ? Date.parse(review2.updateTime) : 0;
  return date2 - date1;
};
