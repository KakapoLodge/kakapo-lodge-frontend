"use client";

import { DotLoader } from "react-spinners";
import styled from "styled-components";

const LoadingAnimation = () => {
  return (
    <LoaderContainer>
      <DotLoader color="#8c9b3e" />
    </LoaderContainer>
  );
};

export default LoadingAnimation;

const LoaderContainer = styled.div`
  height: calc(100vh - 240px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
