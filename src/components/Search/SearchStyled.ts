import styled from "styled-components";
import styles from "../../styles/styles";

const SearchStyled = styled.input`
  &:placeholder {
    color: ${styles.colors.placeholder};
  }
  font-family: inherit;
  font-size: ${styles.fontSizes.small};
  font-weight: ${styles.fontWeights.regular};
  padding: 14px 16px 14px 48px;
  border-radius: 10px;
  border: 2px solid ${styles.colors.main};
  width: 280px;
  position: absolute;
  @media (min-width: 700px) {
    width: 500px;
  }
  max-width: 500px;
  background-image: url("./img/searchIcon.png");
  background-repeat: no-repeat;
  background-size: 32px;
  background-position: 8px 8px;
  margin-top: 16px;
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
`;

export default SearchStyled;
