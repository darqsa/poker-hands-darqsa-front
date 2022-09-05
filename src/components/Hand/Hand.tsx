import { HandData } from "../../features/hands/models/Hand";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import HandStyled from "./HandStyled";
import { useState } from "react";

interface HandProps {
  hand: HandData;
}
const Hand = ({ hand }: HandProps): JSX.Element => {
  const [menuStatus, setMenuStatus] = useState(false);

  const handRoute = "./img/pokerCards/";
  return (
    <HandStyled className="hand">
      <div className="hand__hero-img-group">
        <img
          height={75}
          src={`${handRoute}${hand.preGame.hero.hand[0]}.png`}
          alt={`The ${hand.preGame.hero.hand[0]} poker hand.`}
          className="hand__hero-card"
        />
        <img
          height={75}
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
                height={60}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[0]}.png`}
                alt={`The ${hand.game.flop?.board[0]} poker hand.`}
              />
              <img
                height={60}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[1]}.png`}
                alt={`The ${hand.game.flop?.board[1]} poker hand.`}
              />
              <img
                height={60}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[2]}.png`}
                alt={`The ${hand.game.flop?.board[2]} poker hand.`}
              />
            </>
          )}
          {hand.game.turn?.board && (
            <img
              height={60}
              className="hand__board-card"
              src={`${handRoute}${hand.game.turn?.board}.png`}
              alt={`The ${hand.game.turn?.board} poker hand.`}
            />
          )}
          {hand.game.river?.board && (
            <img
              height={60}
              className="hand__board-card"
              src={`${handRoute}${hand.game.river?.board}.png`}
              alt={`The ${hand.game.river?.board} poker hand.`}
            />
          )}
        </div>
      </div>
      <MoreVertIcon
        onClick={() => {
          setMenuStatus(!menuStatus);
        }}
        data-testid="more-vert"
        className={
          menuStatus
            ? "hand__more-icon hand__more-icon--active"
            : "hand__more-icon"
        }
      />
      {menuStatus && (
        <div className="hand__menu">
          <DeleteIcon data-testid="delete" className="hand__delete-button" />
        </div>
      )}
    </HandStyled>
  );
};
export default Hand;
