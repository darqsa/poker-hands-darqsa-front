import styled, { createGlobalStyle } from "styled-components";
import styles from "./styles";

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
    width: 80%;
    border: 2px solid ${styles.colors.main};
    font-size: ${styles.fontSizes.small};
    border-radius: 10px;
    bottom: 5%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    left: 10%;
    position: sticky;
    right: 10%;
    z-index: 2;
    font-family: inter;
    margin: 0 auto;
    @media (min-width: 700px) {
      margin: 0;
      width: 350px;
      left: 50px;
    }
  }
`;
