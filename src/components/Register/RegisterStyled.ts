import styled from "styled-components";
import styles from "../../styles/styles";

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
    }
    &__group {
      display: flex;
      flex-direction: column;
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
    &__button {
      margin-top: 20px;
      border: none;
      background-color: transparent;
      font-size: ${styles.fontSizes.small};
      font-family: inherit;
      :enabled {
        color: ${styles.colors.red};
        :hover {
          text-decoration: underline;
          cursor: pointer;
        }
        :active {
          color: ${styles.colors.main};
        }
      }
    }
  }
`;
export default FormStyled;
