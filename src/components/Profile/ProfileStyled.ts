import styled from "styled-components";
import styles from "../../styles/styles";

const SideBarStyled = styled.aside`
  position: fixed;
  display: flex;
  width: 100%;
  height: 150px;
  background-color: ${styles.colors.red};
  color: ${styles.colors.white};
  align-items: center;
  border-radius: 0 0 30px 30px;

  @media (min-width: 700px) {
    width: 300px;
    right: 0;
    border-radius: 0 0 0 10px;
  }

  .sidebar {
    &__profile-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: fit-content;
    }
    &__current-user {
      font-weight: ${styles.fontWeights.regular};
      font-size: ${styles.fontSizes.big};
    }
    &__logout-button {
      font-family: inherit;
      font-weight: ${styles.fontWeights.bold};
      color: ${styles.colors.red};
      margin: 15px 0;
      padding: 5px 15px;
      border-radius: 10px;
      background-color: ${styles.colors.white};
      border: 2px solid ${styles.colors.white};
      transition: 0.2s;

      :hover {
        background-color: ${styles.colors.red};
        color: ${styles.colors.white};
        cursor: pointer;
      }

      :active {
        background-color: ${styles.colors.red};
        color: ${styles.colors.white};
      }
    }
  }
`;
export default SideBarStyled;
