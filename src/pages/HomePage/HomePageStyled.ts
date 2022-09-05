import styled from "styled-components";
import styles from "../../styles/styles";

const HomeContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  color: ${styles.colors.main};
  .home-container {
    &__no-hands-text {
      font-weight: ${styles.fontWeights.bold};
      font-size: ${styles.fontSizes.bigger};
      text-align: center;
      margin-top: 100px;
      width: 80%;
      @media (min-width: 700px) {
        width: 35%;
      }
    }
  }
`;
export default HomeContainerStyled;
