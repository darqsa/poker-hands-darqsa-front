import styled from "styled-components";
import styles from "../../styles/styles";

const DetailsStyled = styled.div`
  display: flex;
  background-color: ${styles.colors.grey};
  flex-direction: column;
  margin: 15px 0;
  padding: 20px;
  gap: 20px;
  color: ${styles.colors.main};
  border-radius: 15px;

  p {
    margin: 10px 0 0 0;
  }
  .details {
    &__hand-header {
      display: flex;
      position: relative;
      justify-content: flex-start;
      margin-bottom: 10px;
    }
    &__img-group {
      width: 90px;
    }
    &__hero-card {
      position: absolute;
      &:nth-child(2) {
        left: 22px;
        top: 16px;
      }
    }
    &__name {
      flex: 2.5;
      font-weight: ${styles.fontWeights.bolder};
      font-size: ${styles.fontSizes.medium};
      font-style: italic;
      margin: 0;
    }
    &__section-heading {
      margin-bottom: 0;
    }
    &__game-section {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    &__game-img-container {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    &__description-img {
      max-width: 290px;
    }
  }
`;
export default DetailsStyled;
