import Image from "next/image";
import styled from "styled-components";

type CarouselImageProps = {
  imagePath: string;
  description: string;
};

const CarouselImage = ({ imagePath, description }: CarouselImageProps) => {
  return (
    <_CarouselImage
      src={imagePath}
      alt={description}
      loading="lazy"
      width={1600}
      height={900}
    />
  );
};

export default CarouselImage;

const _CarouselImage = styled(Image)`
  width: 100%;
  height: auto;
`;
