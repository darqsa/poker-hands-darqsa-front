import { HandData } from "../../features/hands/models/Hand";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface HandProps {
  hand: HandData;
}
const Hand = ({ hand }: HandProps): JSX.Element => {
  const handRoute = "./img/pokerCards/";
  return (
    <article className="hand">
      <div className="hand__hero-img-group">
        <img
          src={`${handRoute}${hand.preGame.hero.hand[0]}.png`}
          alt={`The ${hand.preGame.hero.hand[0]} poker hand.`}
          className="hand__hero-card"
        />
        <img
          src={`${handRoute}${hand.preGame.hero.hand[1]}.png`}
          alt={`The ${hand.preGame.hero.hand[1]} poker hand.`}
          className="hand__hero-card"
        />
      </div>
      <div className="hand__hand-container">
        <span className="hand__name">{hand.handName}</span>
        <div className="hand__board-img-group">
          {hand.game.flop?.board[0] && (
            <>
              <img
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[0]}.png`}
                alt={`The ${hand.game.flop?.board[0]} poker hand.`}
              />
              <img
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[1]}.png`}
                alt={`The ${hand.game.flop?.board[1]} poker hand.`}
              />
              <img
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[2]}.png`}
                alt={`The ${hand.game.flop?.board[2]} poker hand.`}
              />
            </>
          )}
          {hand.game.turn?.board && (
            <img
              className="hand__board-card"
              src={`${handRoute}${hand.game.turn?.board}.png`}
              alt={`The ${hand.game.turn?.board} poker hand.`}
            />
          )}
          {hand.game.river?.board && (
            <img
              className="hand__board-card"
              src={`${handRoute}${hand.game.river?.board}.png`}
              alt={`The ${hand.game.river?.board} poker hand.`}
            />
          )}
        </div>
        <KeyboardArrowRightIcon className="hand__info-icon" />
      </div>
    </article>
  );
};
export default Hand;
