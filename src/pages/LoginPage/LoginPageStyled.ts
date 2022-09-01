import styled from "styled-components";
import styles from "../../styles/styles";

const LinkContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  .login-text-container {
    &__text {
      color: ${styles.colors.greyText};
      font-size: ${styles.fontSizes.smaller};
      font-weight: ${styles.fontWeights.regular};
    }
    &__register-link {
      font-size: ${styles.fontSizes.smaller};
      font-weight: ${styles.fontWeights.regular};
    }
  }
`;
export default LinkContainerStyled;
