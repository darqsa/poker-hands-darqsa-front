import styled from "styled-components";
import FormStyled from "../../styles/components/FormStyled";
import styles from "../../styles/styles";

const SearchStyled = styled(FormStyled)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 18px;
  width: 280px;
  @media (min-width: 700px) {
    width: 320px;
  }
  .form {
    &__input {
      width: 100%;
      background-image: url("./img/searchIcon.png");
      background-repeat: no-repeat;
      background-size: 32px;
      background-position: 8px 8px;
      padding-left: 45px;
      &--no-results {
        border: 2px solid ${styles.colors.red};
        :focus {
          border: 2px solid ${styles.colors.red};
        }
      }
    }
    &__no-hands-text {
      position: absolute;
      color: ${styles.colors.red};
      top: 56px;
      font-size: ${styles.fontSizes.smaller};
      @media (min-width: 700px) {
        font-size: ${styles.fontSizes.small};
      }
    }
    &__button {
      margin-bottom: 0;
      margin-top: 0;
    }
    &__button-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export default SearchStyled;
