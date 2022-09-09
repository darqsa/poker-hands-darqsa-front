import { SyntheticEvent, useState } from "react";
import ButtonStyled from "../../styles/components/ButtonStyled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateFormStyled from "./CreateFormStyled";
import DoneIcon from "@mui/icons-material/Done";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import { FormHand, HandData } from "../../features/hands/models/Hand";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { openAlertActionCreator } from "../../features/ui/slices/alertSlice";

const CreateForm = (): JSX.Element => {
  const initialState: FormHand = {
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
  };

  const { createHand } = useHandsApi();
  const [formData, setFormData] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [incorrectFields, setIncorrectFields] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangeData = (event: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const sendFormData = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newHand: HandData = {
      handName: formData.handName,
      preGame: {
        hero: {
          position: formData.heroPosition,
          initialStack: formData.heroStack,
          hand: [formData.heroCard1, formData.heroCard2],
        },
        villains: [
          {
            position: formData.villainPosition,
            initialStack: formData.villainStack,
            hand: [formData.villainCard1, formData.villainCard2],
          },
        ],
      },
      game: {
        preFlop: {
          actions: [formData.preFlopActions],
          pot: formData.preFlopPot,
        },
      },
      postGame: {
        finalPot: formData.preFlopPot,
        gameWinner: formData.gameWinner,
      },
    };
    if (formData.flopCard1) {
      newHand.game.flop = {
        board: [formData.flopCard1, formData.flopCard2, formData.flopCard3],
        actions: [formData.flopActions],
        pot: formData.flopPot,
      };
      newHand.postGame.finalPot = formData.flopPot;
    }
    if (formData.flopCard1 && formData.turnCard) {
      newHand.game.turn = {
        board: formData.turnCard,
        actions: [formData.turnActions],
        pot: formData.turnPot,
      };
      newHand.postGame.finalPot = formData.turnPot;
    }
    if (formData.flopCard1 && formData.turnCard && formData.riverCard) {
      newHand.game.river = {
        board: formData.riverCard,
        actions: [formData.riverActions],
        pot: formData.riverPot,
      };
      newHand.postGame.finalPot = formData.riverPot;
    }
    if (formData.handDescription) {
      newHand.postGame.handDescription = formData.handDescription;
    }
    try {
      await createHand(newHand);

      navigate("/home");

      dispatch(
        openAlertActionCreator(
          `Your hand: ${formData.handName}, has been created successfully 👍`
        )
      );
    } catch (error) {}
  };

  const requiredFields =
    formData.heroPosition === 0 ||
    formData.villainPosition === 0 ||
    formData.heroStack <= 0 ||
    formData.villainStack <= 0 ||
    formData.heroCard1 === "" ||
    formData.heroCard2 === "" ||
    formData.villainCard1 === "" ||
    formData.villainCard2 === "" ||
    formData.handName === "" ||
    formData.preFlopActions === "" ||
    formData.preFlopPot <= 0 ||
    formData.gameWinner === "";

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
    <CreateFormStyled className="form" onSubmit={sendFormData}>
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
                    onChange={onChangeData}
                    value={formData.heroPosition}
                  >
                    {positionOptions}
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="heroStack">
                    * Stack
                  </label>
                  <input
                    className="form__input form__input--number"
                    type="number"
                    id="heroStack"
                    autoComplete="off"
                    required
                    value={formData.heroStack > 0 ? formData.heroStack : ""}
                    onChange={onChangeData}
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
                      value={formData.heroCard1}
                      onChange={onChangeData}
                      maxLength={2}
                    />
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="heroCard2"
                      data-testid="hero-hand-2"
                      autoComplete="off"
                      value={formData.heroCard2}
                      required
                      onChange={onChangeData}
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
                    value={formData.villainPosition}
                    onChange={onChangeData}
                  >
                    {positionOptions}
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="villainStack">
                    * Stack
                  </label>
                  <input
                    className="form__input form__input--number"
                    type="number"
                    id="villainStack"
                    autoComplete="off"
                    required
                    value={
                      formData.villainStack > 0 ? formData.villainStack : ""
                    }
                    onChange={onChangeData}
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
                      value={formData.villainCard1}
                      onChange={onChangeData}
                      maxLength={2}
                    />
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="villainCard2"
                      data-testid="villain-hand-2"
                      autoComplete="off"
                      required
                      value={formData.villainCard2}
                      onChange={onChangeData}
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
                value={formData.handName}
                onChange={onChangeData}
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
                value={formData.preFlopActions}
                required
                onChange={onChangeData}
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
                value={formData.preFlopPot > 0 ? formData.preFlopPot : ""}
                autoComplete="off"
                required
                onChange={onChangeData}
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
                  value={formData.flopCard1}
                  autoComplete="off"
                  onChange={onChangeData}
                />
                <input
                  className="form__input form__input--hand"
                  type="text"
                  id="flopCard2"
                  value={formData.flopCard2}
                  autoComplete="off"
                  onChange={onChangeData}
                />
                <input
                  className="form__input form__input--hand"
                  type="text"
                  id="flopCard3"
                  value={formData.flopCard3}
                  autoComplete="off"
                  onChange={onChangeData}
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
                value={formData.flopActions}
                autoComplete="off"
                onChange={onChangeData}
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
                value={formData.flopPot > 0 ? formData.flopPot : ""}
                onChange={onChangeData}
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
                value={formData.turnCard}
                autoComplete="off"
                onChange={onChangeData}
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
                value={formData.turnActions}
                autoComplete="off"
                onChange={onChangeData}
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
                value={formData.turnPot > 0 ? formData.turnPot : ""}
                autoComplete="off"
                required
                onChange={onChangeData}
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
                value={formData.riverCard}
                autoComplete="off"
                onChange={onChangeData}
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
                onChange={onChangeData}
                value={formData.riverActions}
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
                value={formData.riverPot > 0 ? formData.riverPot : ""}
                onChange={onChangeData}
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
                value={formData.gameWinner}
                onChange={onChangeData}
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
                value={formData.handDescription}
                onChange={onChangeData}
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
                onChange={onChangeData}
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
    </CreateFormStyled>
  );
};
export default CreateForm;
