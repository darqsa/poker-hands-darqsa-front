import { HandData } from "../../features/hands/models/Hand";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HandStyled from "./HandStyled";
import { useState } from "react";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import { useAppDispatch } from "../../app/hooks";
import { openAlertActionCreator } from "../../features/ui/slices/uiSlice";
import { Fade } from "@mui/material";

interface HandProps {
  hand: HandData;
}
const Hand = ({ hand }: HandProps): JSX.Element => {
  const [menuStatus, setMenuStatus] = useState(false);
  const { deleteHand } = useHandsApi();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const shareHand = () => {
    navigator.clipboard.writeText(`${window.location.origin}/hand/${hand.id}`);
    dispatch(openAlertActionCreator("Hand copied to clipboard 📎"));
  };

  const deleteUserHand = () => {
    deleteHand(hand.id!);
    dispatch(openAlertActionCreator(`Hand deleted successfully 💀`));
  };

  const handRoute = "./img/pokerCards/";
  return (
    <HandStyled className="hand">
      <div
        onClick={() => {
          navigate(`/hand/${hand.id!}`);
        }}
        className="hand__hero-img-group"
      >
        <img
          height={75}
          width={56.5}
          src={`${handRoute}${hand.preGame.hero.hand[0]}.webp`}
          alt={`The ${hand.preGame.hero.hand[0]} poker hand.`}
          className="hand__hero-card"
        />
        <img
          height={75}
          width={56.5}
          src={`${handRoute}${hand.preGame.hero.hand[1]}.webp`}
          alt={`The ${hand.preGame.hero.hand[1]} poker hand.`}
          className="hand__hero-card"
        />
      </div>
      <div className="hand__hand-container">
        <span
          onClick={() => {
            navigate(`/hand/${hand.id!}`);
          }}
          className="hand__name"
        >
          {hand.handName}
        </span>
        <div className="hand__board-img-group">
          {hand.game.flop?.board[0] && (
            <>
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop.board[0]}.webp`}
                alt={`The ${hand.game.flop.board[0]} poker hand.`}
              />
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop.board[1]}.webp`}
                alt={`The ${hand.game.flop.board[1]} poker hand.`}
              />
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop.board[2]}.webp`}
                alt={`The ${hand.game.flop.board[2]} poker hand.`}
              />
            </>
          )}
          {hand.game.turn?.board && (
            <img
              height={60}
              width={45.2}
              className="hand__board-card"
              src={`${handRoute}${hand.game.turn.board}.webp`}
              alt={`The ${hand.game.turn.board} poker hand.`}
            />
          )}
          {hand.game.river?.board && (
            <img
              height={60}
              width={45.2}
              className="hand__board-card"
              src={`${handRoute}${hand.game.river.board}.webp`}
              alt={`The ${hand.game.river.board} poker hand.`}
            />
          )}
        </div>
      </div>
      <MoreVertIcon
        onClick={() => {
          setMenuStatus(!menuStatus);
        }}
        className={
          menuStatus
            ? "hand__more-icon hand__more-icon--active"
            : "hand__more-icon"
        }
      />
      <Fade in={menuStatus}>
        <div className="hand__menu">
          <DeleteIcon className="hand__icon" onClick={deleteUserHand} />
          <EditIcon
            className="hand__icon"
            onClick={() => navigate(`/hand/edit/${hand.id!}`)}
          />
          <ShareIcon className="hand__icon" onClick={shareHand} />
        </div>
      </Fade>
    </HandStyled>
  );
};
export default Hand;
