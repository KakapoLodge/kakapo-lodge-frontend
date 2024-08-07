import styled from "styled-components";

const PageContent = styled.main`
  margin-bottom: 16px;

  @media (width < 800px) {
    margin-bottom: 72px;
  }
`;

export default PageContent;

export const PageTitle = styled.h1`
  text-align: center;
  font-size: xx-large;
  font-weight: 500;
  padding: 16px 0px;

  @media (width < 700px) {
    font-size: x-large;
    padding: 10px 0px;
  }
`;
