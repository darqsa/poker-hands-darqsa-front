import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
html {
  font-family: Inter, sans-serif;
  background-color: #f6f6f6;
  min-height: 100vh;
}
body {
  margin: 0;
}
main {
  padding: 0 15px;
}

* {
  box-sizing: border-box;
}

`;
export default GlobalStyles;

export const MainContainerStyled = styled.main`
  .alert {
    position: absolute;
    left: 30%;
    right: 30%;
    bottom: 5%;
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;
