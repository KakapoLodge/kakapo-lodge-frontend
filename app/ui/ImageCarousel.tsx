"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";

type ImageCarouselProps = {
  description: string;
  imagePaths: string[];
  widthPercentage?: number;
};

const ImageCarousel = ({
  description,
  imagePaths,
  widthPercentage = 100,
}: ImageCarouselProps) => {
  return (
    <_Carousel
      showDots={true}
      infinite={true}
      responsive={CAROUSEL_RESPONSIVE}
      $widthPercentage={widthPercentage}
    >
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
    </_Carousel>
  );
};

export default ImageCarousel;

type _CarouselProps = {
  $widthPercentage: number;
};

const _Carousel = styled(Carousel)<_CarouselProps>`
  width: ${(props) => `${props.$widthPercentage}%`};
`;

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
