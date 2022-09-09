import styled from "styled-components";
import styles from "../../styles/styles";

const HandStyled = styled.article`
  display: flex;
  background-color: ${styles.colors.grey};
  padding: 11px 25px 11px 15px;
  min-width: 320px;
  width: 100%;
  height: 130px;
  border-radius: 15px;
  position: relative;
  justify-content: space-between;

  .hand {
    &__hero-img-group {
      max-width: 90px;
      width: 100%;
      min-width: 75px;
    }
    &__hero-card {
      position: absolute;
      top: 20px;
      &:hover {
        cursor: pointer;
      }
      &:nth-child(2) {
        left: 38px;
        top: 38px;
      }
    }
    &__hand-container {
      max-width: 230px;
      width: 100%;
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
      z-index: 1;
      &:hover {
        color: ${styles.colors.red};
        cursor: pointer;
      }
      &--active {
        color: ${styles.colors.white};
        &:hover {
          color: ${styles.colors.main};
        }
      }
    }
    &__menu {
      display: flex;
      background-color: ${styles.colors.red};
      border-radius: 15px;
      align-items: center;
      justify-content: center;
      position: absolute;
      height: 100%;
      width: 100%;
      gap: 40px;
      top: 0;
      right: 0;
    }
    &__delete-button {
      position: relative;
      width: 48px;
      height: 48px;
      font-size: ${styles.fontSizes.big};
      color: ${styles.colors.white};
      cursor: pointer;
      &:hover {
        color: ${styles.colors.main};
      }
    }
  }
`;

export default HandStyled;
