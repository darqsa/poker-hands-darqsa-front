import styled from "styled-components";
import styles from "../styles";

const ButtonStyled = styled.button`
  margin: 15px 0;
  padding: 0;
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
`;
export default ButtonStyled;
