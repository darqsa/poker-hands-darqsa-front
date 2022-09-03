import styled from "styled-components";
import styles from "../../styles/styles";

const HeaderStyled = styled.header`
  background-color: ${styles.colors.red};
  color: ${styles.colors.white};
  display: flex;
  height: 64px;
  a {
    &:active {
      background-color: none;
    }
  }
  .header-container {
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
    }
    &__heading {
      margin: 0;
      font-size: ${styles.fontSizes.bigger};
      font-weight: ${styles.fontWeights.bold};
      align-self: center;
    }
  }
`;
export default HeaderStyled;
