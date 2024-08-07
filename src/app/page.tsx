"use client";
import Image from "next/image";
import PageContent from "./ui/PageContent";
import styled from "styled-components";

const LandingPage = () => {
  return (
    <LandingPageContent>
      <MainBanner />

      <Introduction>
        <Title>Welcome to Kakapo Lodge</Title>

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

const Title = styled.h1`
  text-align: center;
  font-size: xx-large;
  font-weight: 500;

  @media (width < 700px) {
    font-size: x-large;
  }
`;
