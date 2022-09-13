import styled from "styled-components";
import styles from "../../styles/styles";

const HandListContainerStyled = styled.div`
  display: flex;
  color: ${styles.colors.main};
  justify-content: center;
  @media (min-width: 1200px) {
    width: 85%;
  }
  @media (min-width: 900px) {
    width: 80%;
  }
  margin: auto;
  .hands-list-container {
    &__no-hands-text {
      font-weight: ${styles.fontWeights.bold};
      font-size: ${styles.fontSizes.bigger};
      text-align: center;
      margin-top: 100px;
      position: absolute;
      width: 80%;
      @media (min-width: 700px) {
        width: 35%;
      }
    }
    &__list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 0;
      min-width: 320px;
      justify-content: center;
      margin-top: 84px;
    }
    &__list-item {
      width: 380px;
      min-width: 320px;
    }
  }
`;
export default HandListContainerStyled;
