import HomeContainerStyled from "./HomePageStyled";

const HomePage = (): JSX.Element => {
  return (
    <HomeContainerStyled className="home-container">
      <p className="home-container__no-hands-text">
        You currently have no hands in your list... Try clicking at the top-left
        icon to create a new hand.
      </p>
    </HomeContainerStyled>
  );
};
export default HomePage;
