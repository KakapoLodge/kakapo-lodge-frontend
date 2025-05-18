import CarouselImage from "./CarouselImage";
import CustomCarousel from "./CustomCarousel";

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
    <CustomCarousel
      showDots={true}
      singleItem={true}
      widthPercentage={widthPercentage}
    >
      {imagePaths.map((imagePath) => (
        <CarouselImage
          key={imagePath}
          imagePath={imagePath}
          description={description}
        />
      ))}
    </CustomCarousel>
  );
};

export default ImageCarousel;
