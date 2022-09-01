import { createGlobalStyle } from "styled-components";

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
