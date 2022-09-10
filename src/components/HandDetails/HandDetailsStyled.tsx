import styled from "styled-components";
import styles from "../../styles/styles";

const DetailsStyled = styled.div`
  display: flex;
  background-color: ${styles.colors.grey};
  flex-direction: column;
  margin: 15px 0;
  padding: 25px;
  color: ${styles.colors.main};
  border-radius: 15px;
  @media (min-width: 700px) {
    width: 65%;
    margin: 30px auto;
    padding: 25px 50px;
  }
  p {
    margin: 10px 0 0 0;
  }
  .details {
    &__info-container {
      @media (min-width: 700px) {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
      }
    }
    &__hand-header {
      display: flex;
      position: relative;
      justify-content: flex-start;
      height: 80px;
    }
    &__img-group {
      width: 80px;
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
      font-size: ${styles.fontSizes.big};
      font-style: italic;
      margin: 0;
      @media (min-width: 700px) {
        margin: auto 0;
      }
    }
    &__section-heading {
      margin-bottom: 0;
    }
    &__game-section {
      display: flex;
      flex-direction: column;
      gap: 5px;
      @media (min-width: 700px) {
        width: 45%;
      }
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
