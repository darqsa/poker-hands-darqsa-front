import styled from "styled-components";
import FormStyled from "../../styles/components/FormStyled";
import styles from "../../styles/styles";

const CreateFormStyled = styled(FormStyled)`
  background-color: ${styles.colors.grey};
  width: fit-content;
  margin: 20px auto;
  border-radius: 20px;
  align-items: center;
  min-width: 320px;
  padding: 20px 25px;
  gap: 10px;
  .form {
    &__player-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    &__title {
      margin-bottom: 10px;
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
      gap: 40px;
    }
    &__label {
      align-self: auto;
      width: 87px;
      background-color: transparent;
      color: ${styles.colors.main};
      position: initial;
      padding: 5px 0;
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
      &--hand-name {
        width: 215px;
      }
    }
    &__arrow-icon {
      align-self: flex-end;
      margin: 10px 0 0 0;
      width: 36px;
      height: 36px;
      :hover {
        cursor: pointer;
        color: ${styles.colors.red};
      }
    }
  }
`;

export default CreateFormStyled;
