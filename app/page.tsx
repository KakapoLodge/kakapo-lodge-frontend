"use client";
import Image from "next/image";
import PageContent from "./ui/PageContent";
import styled from "styled-components";
import Link from "next/link";

const MOBILE_MAX_WIDTH = 700;
const IS_MOBILE = document.documentElement.clientWidth < MOBILE_MAX_WIDTH;

const LandingPage = () => {
  return (
    <LandingPageContent>
      <MainBanner />

      <Introduction>
        <IntroductionTitle>Welcome to Kakapo Lodge</IntroductionTitle>

        <p>
          The two-story purpose-built backpacker hostel features modern rooms,
          an open lounge with warm fireplace, and a relaxed, friendly
          atmosphere. Enjoy our spacious, well-appointed backpacker
          accommodation, Netflix, fast unlimited WiFi, large kitchen, outdoor
          courtyard with views of the Southern Alps.
        </p>

        <p>
          Just three minutes' walk from the town's main attraction, Hanmer
          Springs Thermal Pools and Spa, and a pleasant stroll to numerous
          restaurants and stores, our hostel is a great base to enjoy your
          relaxing Hanmer getaway.
        </p>

        <p>
          All ensuite accommodation has free towels as well as free soap and
          shampoo.
        </p>
      </Introduction>

      <>
        <ReviewsTitle>What Our Previous Guests Say</ReviewsTitle>
        <Reviews>
        {IS_MOBILE ? (
          <MobileTripadvisorReviews />
        ) : (
          <DesktopTripadvisorReviews />
        )}
        </Reviews>
      </>
    </LandingPageContent>
  );
};

export default LandingPage;

const LandingPageContent = styled(PageContent)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (width < 700px) {
    gap: 16px;
  }
`;

const MainBanner = () => {
  return (
    <Image
      src="/landing_page/banner.png"
      alt="Main Banner"
      width={1621}
      height={855}
      style={{ width: "100%", height: "auto" }}
      priority
    />
  );
};

const Introduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0px 16vw;

  @media (width < 700px) {
    padding: 0px 32px;
  }
`;

const IntroductionTitle = styled.h1`
  text-align: center;
  font-size: xx-large;
  font-weight: 500;

  @media (width < 700px) {
    font-size: x-large;
  }
`;

const ReviewsTitle = styled.h2`
  font-size: larger;
  text-align: center;
`;

const Reviews = styled.div`
  width: 468px;
  margin: 0px auto;

  @media (width < 700px) {
    width: 240px;
  }
`;

const DesktopTripadvisorReviews = () => {
  return (
    <>
      <div id="TA_selfserveprop949" className="TA_selfserveprop">
        <ul id="k3tfslo5aC52" className="TA_links E8XtQq04cH">
          <li id="T5jNwkCQ1" className="d17vdf67Ro">
            <Link
              target="_blank"
              href="https://www.tripadvisor.com/Hotel_Review-g635990-d1125137-Reviews-Kakapo_Lodge-Hanmer_Springs_Canterbury_Region_South_Island.html"
            >
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                alt="TripAdvisor"
              />
            </Link>
          </li>
        </ul>
      </div>
      <script
        async
        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=949&amp;locationId=1125137&amp;lang=en_US&amp;rating=true&amp;nreviews=4&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=true&amp;border=false&amp;display_version=2"
        data-loadtrk
        // onload="this.loadtrk=true"
      ></script>
    </>
  );
};

const MobileTripadvisorReviews = () => {
  return (
    <>
      <div id="TA_selfserveprop241" className="TA_selfserveprop">
        <ul id="1WCwuo" className="TA_links rziphGMK">
          <li id="wzN5H1whM" className="5lrWc3hRiDv">
            <a
              target="_blank"
              href="https://www.tripadvisor.com/Hotel_Review-g635990-d1125137-Reviews-Kakapo_Lodge-Hanmer_Springs_Canterbury_Region_South_Island.html"
            >
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                alt="TripAdvisor"
              />
            </a>
          </li>
        </ul>
      </div>
      <script
        async
        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=241&amp;locationId=1125137&amp;lang=en_US&amp;rating=true&amp;nreviews=5&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=false&amp;border=false&amp;display_version=2"
        data-loadtrk
        // onload="this.loadtrk=true"
      ></script>
    </>
  );
};
