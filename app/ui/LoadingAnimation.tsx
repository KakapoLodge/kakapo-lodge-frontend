import { DotLoader } from "react-spinners";
import styled from "styled-components";

type LoadingAnimationProps = {
  text?: string;
};

const LoadingAnimation = ({ text }: LoadingAnimationProps) => {
  return (
    <LoaderContainer>
      <DotLoader color="#8c9b3e" />
      {text ? <p>{text}</p> : <></>}
    </LoaderContainer>
  );
};

export default LoadingAnimation;

const LoaderContainer = styled.div`
  height: calc(100vh - 240px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
