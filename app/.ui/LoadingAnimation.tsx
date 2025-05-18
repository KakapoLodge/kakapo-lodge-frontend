import { DotLoader } from "react-spinners";
import styled from "styled-components";

type LoadingAnimationProps = {
  text?: string;
  height?: string;
};

const LoadingAnimation = ({ text, height }: LoadingAnimationProps) => {
  return (
    <LoaderContainer $height={height}>
      <DotLoader color="#8c9b3e" />
      {text ? <p>{text}</p> : <></>}
    </LoaderContainer>
  );
};

export default LoadingAnimation;

type LoaderContainerProps = {
  $height?: string;
};

const LoaderContainer = styled.div<LoaderContainerProps>`
  height: ${(props) => (props.$height ? props.$height : "calc(100vh - 240px)")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
