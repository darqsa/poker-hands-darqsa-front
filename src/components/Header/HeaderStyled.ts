import styled from "styled-components";
import styles from "../../styles/styles";

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 3;
  a {
    &::selection {
      background-color: none;
    }
  }
  a.nostyle:link {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }
  a.nostyle:visited {
    text-decoration: inherit;
    color: inherit;
    cursor: auto;
  }
  .header-container {
    &__container {
      background-color: ${styles.colors.red};
      color: ${styles.colors.white};
      display: flex;
      height: 64px;
    }
    &__item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__item-heading {
      flex: 3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__icon {
      height: 32px;
      width: 32px;
      color: ${styles.colors.white};
      cursor: pointer;
      &--left {
        padding-top: 4px;
        height: 45px;
        width: 45px;
      }
      &--right {
        padding-top: 4px;
        height: 32px;
        width: 32px;
      }
    }
    &__current-user {
      @media (min-width: 700px) {
        font-weight: ${styles.fontWeights.medium};
        display: flex;
        gap: 3px;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        cursor: pointer;
      }
    }
    &__logout {
      color: ${styles.colors.white};
      text-decoration: none;
    }
    &__heading {
      margin: 0;
      font-size: ${styles.fontSizes.bigger};
      font-weight: ${styles.fontWeights.bold};
      align-self: center;
    }
    &__logout-button {
      font-weight: ${styles.fontWeights.medium};
      color: ${styles.colors.white};
    }
    &__profile-mobile {
      position: fixed;
      display: flex;
      top: 60px;
      flex-direction: column;
      background-color: ${styles.colors.red};
      width: fit-content;
      justify-content: center;
      align-items: flex-end;
      border-radius: 0 0 0 20px;
      padding: 15px;
      gap: 10px;
      right: 0;
      z-index: 2;
    }
    &__current-user-text {
      display: flex;
      align-items: center;
      color: ${styles.colors.white};
      font-size: ${styles.fontSizes.medium};
      font-weight: ${styles.fontWeights.medium};
      text-align: end;
    }
  }
`;
export default HeaderStyled;
