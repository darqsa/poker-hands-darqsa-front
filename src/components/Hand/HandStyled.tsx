import styled from "styled-components";
import styles from "../../styles/styles";

const HandStyled = styled.article`
  display: flex;
  background-color: ${styles.colors.grey};
  padding: 11px 25px 11px 15px;
  min-width: 320px;
  max-width: 380px;
  height: 130px;
  border-radius: 15px;
  position: relative;
  justify-content: space-between;

  .hand {
    &__hero-img-group {
      width: 90px;
      min-width: 75px;
    }
    &__hero-card {
      position: absolute;
      top: 20px;
      &:nth-child(2) {
        left: 38px;
        top: 38px;
      }
    }
    &__hand-container {
      width: 230px;
      min-width: 190px;
      padding-left: 5px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    &__name {
      font-weight: ${styles.fontWeights.bolder};
      font-size: ${styles.fontSizes.medium};
      font-style: italic;
      &:hover {
        color: ${styles.colors.red};
        cursor: pointer;
      }
    }
    &__board-img-group {
      display: flex;
      justify-content: flex-start;
    }
    &__board-card {
      margin: 0 -1.5px;
    }
    &__more-icon {
      color: ${styles.colors.main};
      position: relative;
      top: 3px;
      right: -10px;
      &:hover {
        color: ${styles.colors.red};
        cursor: pointer;
      }
    }
  }
`;

export default HandStyled;
