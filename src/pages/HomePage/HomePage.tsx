import Hand from "../../components/Hand/Hand";
import { HandData } from "../../features/hands/models/Hand";
import HomeContainerStyled from "./HomePageStyled";

const HomePage = (): JSX.Element => {
  const testHand: HandData = {
    handName: "Best hand name ever fpodsmfpomf",
    preGame: {
      hero: { hand: ["Ac", "Ad"], initialStack: 100, position: 0 },
      villains: [{ hand: ["Ah", "As"], initialStack: 100, position: 1 }],
    },
    game: {
      preFlop: { actions: ["Everyone is allin"], pot: 200 },
      flop: {
        board: ["Ts", "9c", "8h"],
        actions: ["Everyone is allin"],
        pot: 200,
      },
      turn: { board: "7d", actions: ["Everyone is allin"], pot: 200 },
      river: { board: "6d", actions: ["Everyone is allin"], pot: 200 },
    },
    postGame: { finalPot: 200, gameWinner: "Hero" },
    id: "1234",
  };

  return (
    <HomeContainerStyled className="home-container">
      {!testHand && (
        <p className="home-container__no-hands-text">
          You currently have no hands in your list... Try clicking at the
          top-left icon to create a new hand.
        </p>
      )}
      <Hand hand={testHand} />
    </HomeContainerStyled>
  );
};
export default HomePage;
