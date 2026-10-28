import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "styled-components";

type CustomCarouselProps = {
  showDots?: boolean;
  singleItem?: boolean;
  widthPercentage?: number;
  children: React.ReactNode;
};

const CustomCarousel = ({
  showDots = false,
  singleItem = false,
  widthPercentage = 100,
  children,
}: CustomCarouselProps) => {
  const responsive = singleItem
    ? SINGLE_ITEM_RESPONSIVE
    : MULTIPLE_ITEM_RESPONSIVE;

  return (
    <_Carousel
      showDots={showDots}
      infinite={true}
      responsive={responsive}
      $widthPercentage={widthPercentage}
    >
      {children}
    </_Carousel>
  );
};

export default CustomCarousel;

type _CarouselProps = {
  $widthPercentage: number;
};

const _Carousel = styled(Carousel)<_CarouselProps>`
  width: ${(props) => `${props.$widthPercentage}%`};
`;

const SINGLE_ITEM_RESPONSIVE = {
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

const MULTIPLE_ITEM_RESPONSIVE = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
