import styled from "styled-components";
import styles from "../../styles/styles";

const HandListContainerStyled = styled.div`
  display: flex;
  color: ${styles.colors.main};
  justify-content: center;
  @media (min-width: 1000px) {
    width: 85%;
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
      flex-wrap: wrap;
      gap: 20px;
      padding: 0;
      min-width: 320px;
      display: flex;
      justify-content: center;

      @media (min-width: 830px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1300px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      margin-top: 100px;
    }

    &__list-item {
      width: 380px;
      min-width: 320px;
    }
  }
`;
export default HandListContainerStyled;
