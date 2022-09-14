import { SyntheticEvent, useEffect, useState } from "react";
import ButtonStyled from "../../styles/components/ButtonStyled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HandFormStyled from "./HandFormStyled";
import DoneIcon from "@mui/icons-material/Done";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import { FormHand, HandData } from "../../features/hands/models/Hand";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openAlertActionCreator } from "../../features/ui/slices/uiSlice";

let formData = new FormData();
interface HandFormProps {
  formFunction: "edit" | "create";
}
const HandForm = ({ formFunction }: HandFormProps): JSX.Element => {
  let initialState: FormHand = {
    handName: "",
    heroPosition: 0,
    villainPosition: 0,
    heroStack: 0,
    villainStack: 0,
    heroCard1: "",
    heroCard2: "",
    villainCard1: "",
    villainCard2: "",
    preFlopActions: "",
    preFlopPot: 0,
    flopCard1: "",
    flopCard2: "",
    flopCard3: "",
    flopActions: "",
    flopPot: 0,
    turnCard: "",
    turnActions: "",
    turnPot: 0,
    riverCard: "",
    riverActions: "",
    riverPot: 0,
    gameWinner: "",
    handDescription: "",
    handImage: "",
  };

  const userId = useAppSelector((state) => state.user.id);
  const { createHand, loadHandById, editHand } = useHandsApi();
  const [formInfo, setFormInfo] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [incorrectFields, setIncorrectFields] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handId } = useParams();

  const parseToFormInfo = (hand: HandData) => {
    return {
      handName: hand.handName,
      heroPosition: hand.preGame.hero.position,
      villainPosition: hand.preGame.villains[0].position,
      heroStack: hand.preGame.hero.initialStack,
      villainStack: hand.preGame.villains[0].initialStack,
      heroCard1: hand.preGame.hero.hand[0],
      heroCard2: hand.preGame.hero.hand[1],
      villainCard1: hand.preGame.villains[0].hand[0],
      villainCard2: hand.preGame.villains[0].hand[0],
      preFlopActions: hand.game.preFlop.actions[0],
      preFlopPot: hand.game.preFlop.pot,
      flopCard1: hand.game.flop?.board[0] ?? "",
      flopCard2: hand.game.flop?.board[1] ?? "",
      flopCard3: hand.game.flop?.board[2] ?? "",
      flopActions: hand.game.flop?.actions[0] ?? "",
      flopPot: hand.game.flop?.pot ?? 0,
      turnCard: hand.game.turn?.board ?? "",
      turnActions: hand.game.turn?.actions[0] ?? "",
      turnPot: hand.game.turn?.pot ?? 0,
      riverCard: hand.game.river?.board ?? "",
      riverActions: hand.game.river?.actions[0] ?? "",
      riverPot: hand.game.river?.pot ?? 0,
      gameWinner: hand.postGame.gameWinner,
      handDescription: hand.postGame.handDescription ?? "",
      handImage: "",
    };
  };

  useEffect(() => {
    (async () => {
      if (formFunction === "edit") {
        let idHand: HandData = await loadHandById(handId!);
        !idHand ? navigate("/home") : setFormInfo(parseToFormInfo(idHand));
      }
    })();
  }, [loadHandById, handId, navigate, formFunction]);

  const onChangeInfo = (event: React.ChangeEvent<any>) => {
    setFormInfo({
      ...formInfo,
      [event.target.id]: event.target.value,
    });
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    formData.append("handImage", event.target.files![0]);
  };

  const sendformInfo = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newHand: HandData = {
      handName: formInfo.handName,
      preGame: {
        hero: {
          position: formInfo.heroPosition,
          initialStack: formInfo.heroStack,
          hand: [formInfo.heroCard1, formInfo.heroCard2],
        },
        villains: [
          {
            position: formInfo.villainPosition,
            initialStack: formInfo.villainStack,
            hand: [formInfo.villainCard1, formInfo.villainCard2],
          },
        ],
      },
      game: {
        preFlop: {
          actions: [formInfo.preFlopActions],
          pot: formInfo.preFlopPot,
        },
      },
      postGame: {
        finalPot: formInfo.preFlopPot,
        gameWinner: formInfo.gameWinner,
      },
      owner: userId,
    };
    if (formInfo.flopCard1) {
      newHand.game.flop = {
        board: [formInfo.flopCard1, formInfo.flopCard2, formInfo.flopCard3],
        actions: [formInfo.flopActions],
        pot: formInfo.flopPot,
      };
      newHand.postGame.finalPot = formInfo.flopPot;
    }
    if (formInfo.flopCard1 && formInfo.turnCard) {
      newHand.game.turn = {
        board: formInfo.turnCard,
        actions: [formInfo.turnActions],
        pot: formInfo.turnPot,
      };
      newHand.postGame.finalPot = formInfo.turnPot;
    }
    if (formInfo.flopCard1 && formInfo.turnCard && formInfo.riverCard) {
      newHand.game.river = {
        board: formInfo.riverCard,
        actions: [formInfo.riverActions],
        pot: formInfo.riverPot,
      };
      newHand.postGame.finalPot = formInfo.riverPot;
    }
    if (formInfo.handDescription) {
      newHand.postGame.handDescription = formInfo.handDescription;
    }
    try {
      formData.append("userHand", JSON.stringify(newHand));
      formFunction === "create"
        ? await createHand(formData)
        : await editHand(formData, handId!);

      formData = new FormData();

      navigate("/home");

      dispatch(
        openAlertActionCreator(
          `Your hand: ${formInfo.handName}, has been ${
            formFunction === "create" ? "created" : "edited"
          } successfully 👍`
        )
      );
    } catch (error) {}
  };

  const requiredFields =
    formInfo.heroPosition === 0 ||
    formInfo.villainPosition === 0 ||
    formInfo.heroStack <= 0 ||
    formInfo.villainStack <= 0 ||
    formInfo.heroCard1 === "" ||
    formInfo.heroCard2 === "" ||
    formInfo.villainCard1 === "" ||
    formInfo.villainCard2 === "" ||
    formInfo.handName === "" ||
    formInfo.preFlopActions === "" ||
    formInfo.preFlopPot <= 0 ||
    formInfo.gameWinner === "";

  const positionOptions = (
    <>
      <option value={0} className="form__list-option">
        ---
      </option>
      <option value={1} className="form__list-option">
        SB
      </option>
      <option value={2} className="form__list-option">
        BB
      </option>
      <option value={3} className="form__list-option">
        UTG
      </option>
      <option value={4} className="form__list-option">
        MP
      </option>
      <option value={5} className="form__list-option">
        CO
      </option>
      <option value={6} className="form__list-option">
        BTN
      </option>
    </>
  );
  return (
    <HandFormStyled className="form" onSubmit={sendformInfo}>
      {currentPage === 1 && (
        <>
          <h2 className="form__title">Game info</h2>
          <section className="form__section">
            <div className="form__players-container">
              <div className="form__player-container">
                <h3 className="form__group-heading">Hero</h3>
                <div className="form__group">
                  <label className="form__label" htmlFor="heroPosition">
                    * Position
                  </label>
                  <select
                    className="form__input form__input--selector"
                    id="heroPosition"
                    autoComplete="off"
                    required
                    onChange={onChangeInfo}
                    value={formInfo.heroPosition}
                  >
                    {positionOptions}
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="heroStack">
                    * Stack (bb)
                  </label>
                  <input
                    className="form__input form__input--number"
                    type="number"
                    id="heroStack"
                    autoComplete="off"
                    required
                    value={formInfo.heroStack > 0 ? formInfo.heroStack : ""}
                    onChange={onChangeInfo}
                    max={999}
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="heroCard1" className="form__label">
                    * Hand
                  </label>
                  <div className="form__hand-container">
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="heroCard1"
                      autoComplete="off"
                      required
                      value={formInfo.heroCard1}
                      onChange={onChangeInfo}
                      maxLength={2}
                    />
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="heroCard2"
                      data-testid="hero-hand-2"
                      autoComplete="off"
                      value={formInfo.heroCard2}
                      required
                      onChange={onChangeInfo}
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>
              <div className="form__player-container">
                <h3 className="form__group-heading">Villain</h3>
                <div className="form__group">
                  <label className="form__label" htmlFor="villainPosition">
                    * Position
                  </label>
                  <select
                    className="form__input form__input--selector"
                    id="villainPosition"
                    autoComplete="off"
                    required
                    value={formInfo.villainPosition}
                    onChange={onChangeInfo}
                  >
                    {positionOptions}
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="villainStack">
                    * Stack (bb)
                  </label>
                  <input
                    className="form__input form__input--number"
                    type="number"
                    id="villainStack"
                    autoComplete="off"
                    required
                    value={
                      formInfo.villainStack > 0 ? formInfo.villainStack : ""
                    }
                    onChange={onChangeInfo}
                    max={999}
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="villainCard1" className="form__label">
                    * Hand
                  </label>
                  <div className="form__hand-container">
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="villainCard1"
                      autoComplete="off"
                      required
                      value={formInfo.villainCard1}
                      onChange={onChangeInfo}
                      maxLength={2}
                    />
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="villainCard2"
                      data-testid="villain-hand-2"
                      autoComplete="off"
                      required
                      value={formInfo.villainCard2}
                      onChange={onChangeInfo}
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="handName" className="form__label">
                * Hand name
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="handName"
                autoComplete="off"
                required
                value={formInfo.handName}
                onChange={onChangeInfo}
                maxLength={40}
              />
            </div>
            <ArrowForwardIcon
              data-testid="next-first-page"
              className="form__icon"
              onClick={() => setCurrentPage(2)}
            />
          </section>
        </>
      )}
      {currentPage === 2 && (
        <>
          <section className="form__section form__section--streets">
            <h2 className="form__title form__title--streets">Preflop</h2>
            <div className="form__group">
              <label className="form__label" htmlFor="preFlopActions">
                * Actions
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="preFlopActions"
                autoComplete="off"
                value={formInfo.preFlopActions}
                required
                onChange={onChangeInfo}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="preFlopPot">
                * Pot
              </label>
              <input
                className="form__input"
                type="number"
                id="preFlopPot"
                value={formInfo.preFlopPot > 0 ? formInfo.preFlopPot : ""}
                autoComplete="off"
                required
                onChange={onChangeInfo}
              />
            </div>
          </section>
          <section className="form__section form__section--streets">
            <h2 className="form__title form__title--streets">Flop</h2>
            <div className="form__group">
              <label className="form__label" htmlFor="flopCard1">
                Board
              </label>
              <div className="form__hand-container">
                <input
                  className="form__input form__input--hand"
                  type="text"
                  id="flopCard1"
                  value={formInfo.flopCard1}
                  autoComplete="off"
                  onChange={onChangeInfo}
                />
                <input
                  className="form__input form__input--hand"
                  type="text"
                  id="flopCard2"
                  data-testid="board-hand2"
                  value={formInfo.flopCard2}
                  autoComplete="off"
                  onChange={onChangeInfo}
                />
                <input
                  className="form__input form__input--hand"
                  type="text"
                  data-testid="board-hand3"
                  id="flopCard3"
                  value={formInfo.flopCard3}
                  autoComplete="off"
                  onChange={onChangeInfo}
                />
              </div>
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="flopActions">
                Actions
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="flopActions"
                value={formInfo.flopActions}
                autoComplete="off"
                onChange={onChangeInfo}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="flopPot">
                Pot
              </label>
              <input
                className="form__input"
                type="number"
                id="flopPot"
                autoComplete="off"
                required
                value={formInfo.flopPot > 0 ? formInfo.flopPot : ""}
                onChange={onChangeInfo}
              />
            </div>
          </section>
          <section className="form__section form__section--streets">
            <h2 className="form__title form__title--streets">Turn</h2>
            <div className="form__group">
              <label className="form__label" htmlFor="turnCard">
                Board
              </label>
              <input
                className="form__input  form__input--hand"
                type="text"
                id="turnCard"
                value={formInfo.turnCard}
                autoComplete="off"
                onChange={onChangeInfo}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="turnActions">
                Actions
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="turnActions"
                value={formInfo.turnActions}
                autoComplete="off"
                onChange={onChangeInfo}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="turnPot">
                Pot
              </label>
              <input
                className="form__input"
                type="number"
                id="turnPot"
                value={formInfo.turnPot > 0 ? formInfo.turnPot : ""}
                autoComplete="off"
                required
                onChange={onChangeInfo}
              />
            </div>
          </section>
          <section className="form__section form__section--streets">
            <h2 className="form__title form__title--streets">River</h2>
            <div className="form__group">
              <label className="form__label" htmlFor="riverCard">
                Board
              </label>
              <input
                className="form__input form__input--hand"
                type="text"
                id="riverCard"
                value={formInfo.riverCard}
                autoComplete="off"
                onChange={onChangeInfo}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="riverActions">
                Actions
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="riverActions"
                autoComplete="off"
                onChange={onChangeInfo}
                value={formInfo.riverActions}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="riverPot">
                Pot
              </label>
              <input
                className="form__input"
                type="number"
                id="riverPot"
                autoComplete="off"
                required
                value={formInfo.riverPot > 0 ? formInfo.riverPot : ""}
                onChange={onChangeInfo}
              />
            </div>
          </section>
          <div className="form__footer">
            <ArrowBackIcon
              data-testid="previous-second-page"
              className="form__icon"
              onClick={() => setCurrentPage(1)}
            />
            <ArrowForwardIcon
              data-testid="next-second-page"
              className="form__icon"
              onClick={() => setCurrentPage(3)}
            />
          </div>
        </>
      )}
      {currentPage === 3 && (
        <>
          <h2 className="form__title">Post game</h2>
          <section className="form__section">
            <div className="form__group">
              <label className="form__label" htmlFor="gameWinner">
                * Winner
              </label>
              <select
                className="form__input form__input--winner-selector"
                id="gameWinner"
                autoComplete="off"
                value={formInfo.gameWinner}
                onChange={onChangeInfo}
              >
                <option value="" className="form__list-option">
                  ------
                </option>
                <option value="hero" className="form__list-option">
                  Hero
                </option>
                <option value="villain" className="form__list-option">
                  Villain
                </option>
              </select>
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="handDescription">
                Description
              </label>
              <textarea
                className="form__input form__input--text-area"
                id="handDescription"
                autoComplete="off"
                value={formInfo.handDescription}
                onChange={onChangeInfo}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="handImage">
                Image
              </label>
              <input
                className="form__input form__input--image"
                type="file"
                id="handImage"
                autoComplete="off"
                value={formInfo.handImage}
                onChange={onChangeFile}
              />
            </div>
            {incorrectFields && (
              <span className="form__text">
                Please complete *required fields
              </span>
            )}
          </section>
          <div className="form__footer">
            <ArrowBackIcon
              data-testid="previous-third-page"
              className="form__icon"
              onClick={() => setCurrentPage(2)}
            />
            {requiredFields ? (
              <DoneIcon
                className="form__icon"
                onClick={() => setIncorrectFields(true)}
              />
            ) : (
              <ButtonStyled className="form__button" type="submit">
                <DoneIcon className="form__icon" />
              </ButtonStyled>
            )}
          </div>
        </>
      )}
    </HandFormStyled>
  );
};
export default HandForm;
