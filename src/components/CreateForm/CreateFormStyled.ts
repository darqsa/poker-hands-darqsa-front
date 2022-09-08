import styled from "styled-components";
import FormStyled from "../../styles/components/FormStyled";
import styles from "../../styles/styles";

const CreateFormStyled = styled(FormStyled)`
  background-color: ${styles.colors.grey};
  width: fit-content;
  margin: 20px auto;
  border-radius: 20px;
  align-items: center;
  min-width: 280px;
  width: fit-content;
  gap: 10px;
  padding: 25px;
  position: relative;
  @media (min-width: 700px) {
  }
  .form {
    &__players-container {
      display: flex;
      gap: 40px;
    }
    &__player-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    &__group {
      display: flex;
      align-items: center;
    }
    &__group-heading {
      margin: 0;
    }
    &__section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      &--streets {
        @media (min-width: 700px) {
          flex-direction: row;
          align-self: flex-start;
          width: 100%;
          justify-content: flex-end;
        }
      }
    }
    &__title {
      margin-bottom: 10px;
      &--streets {
        @media (min-width: 700px) {
          margin-inline-end: auto;
        }
      }
    }
    &__label {
      align-self: auto;
      background-color: transparent;
      color: ${styles.colors.main};
      position: initial;
      padding: 5px 0;
      text-align: center;
      font-weight: ${styles.fontWeights.bold};
    }
    &__hand-container {
      display: flex;
      gap: 2px;
    }
    &__input {
      width: 80px;
      padding: 10px;
      border-radius: 5px;
      &--hand {
        padding: 10px 8px;
        width: 40px;
      }
      &--text {
        width: 215px;
      }
      &--text-area {
        width: 315px;
        height: 110px;
      }
      &--image {
        width: 315px;
      }
      &--winner-selector {
        width: 90px;
      }
    }
    &__icon {
      align-self: flex-end;
      margin: 10px 0 0 0;
      width: 36px;
      height: 36px;
      :hover {
        cursor: pointer;
        color: ${styles.colors.red};
      }
    }
    &__footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }
    &__button {
      color: ${styles.colors.main};
      margin: 0;
      position: relative;
      top: 5px;
      :hover {
        color: ${styles.colors.red};
      }
    }
    &__text {
      position: absolute;
      bottom: 65px;
      color: ${styles.colors.red};
    }
  }
`;

export default CreateFormStyled;
