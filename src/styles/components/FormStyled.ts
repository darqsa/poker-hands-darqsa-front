import styled from "styled-components";
import styles from "../styles";

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 15px;
  align-items: center;
  color: ${styles.colors.main};
  .form {
    &__heading {
      font-weight: ${styles.fontWeights.bold};
      font-size: ${styles.fontSizes.bigger};
      text-align: center;
      margin: 0;
    }
    &__group {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    &__label {
      width: max-content;
      padding: 6px 10px;
      border-radius: 10px;
      font-size: ${styles.fontSizes.smaller};
      background-color: ${styles.colors.main};
      color: ${styles.colors.white};
      position: relative;
      font-weight: ${styles.fontWeights.regular};
      left: 5px;
      top: 12px;
    }
    &__input {
      &:placeholder {
        color: ${styles.colors.placeholder};
      }
      font-family: inherit;
      font-size: ${styles.fontSizes.small};
      font-weight: ${styles.fontWeights.regular};
      padding: 14px 16px;
      border-radius: 10px;
      border: 2px solid ${styles.colors.main};
      width: 275px;
      &:focus {
        border-color: black;
        outline: none;
      }
      &--wrong {
        border: 2px solid ${styles.colors.red};
        &::placeholder {
          color: ${styles.colors.red};
          opacity: 70%;
        }
        &:focus {
          border: 2px solid ${styles.colors.red};
        }
      }
    }
    &__wrong-password {
      color: ${styles.colors.red};
      position: absolute;
      top: 80px;
      left: 5px;
      font-size: ${styles.fontSizes.smaller};
    }
  }
`;
export default FormStyled;
