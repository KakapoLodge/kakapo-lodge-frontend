"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import styled from "styled-components";

type CustomCarouselProps = {
  imagePaths: string[];
  description: string;
};

const CustomCarousel = ({
  imagePaths,
  description,
}: CustomCarouselProps) => {
  return (
    <Carousel responsive={CAROUSEL_RESPONSIVE} showDots={true} infinite={true}>
      {imagePaths.map((imagePath) => (
        <CarouselImage
          key={imagePath}
          src={imagePath}
          alt={description}
          loading="lazy"
          width={1600}
          height={900}
        />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;

const CAROUSEL_RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselImage = styled(Image)`
  width: 100%;
  height: auto;
`;
