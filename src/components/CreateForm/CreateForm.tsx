import { useState } from "react";
import ButtonStyled from "../../styles/components/ButtonStyled";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateFormStyled from "./CreateFormStyled";
import DoneIcon from "@mui/icons-material/Done";

const CreateForm = (): JSX.Element => {
  const [formData, setFormData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeData = (event: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <CreateFormStyled className="form">
      {currentPage === 1 && (
        <>
          <h2 className="form__title">Game info</h2>
          <section className="form__section">
            <div className="form__players-container">
              <div className="form__player-container">
                <h3 className="form__group-heading">Hero</h3>
                <div className="form__group">
                  <label className="form__label" htmlFor="heroPosition">
                    Position
                  </label>
                  <select
                    className="form__input form__input--selector"
                    id="heroPosition"
                    autoComplete="off"
                    required
                    onChange={onChangeData}
                  >
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
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="heroStack">
                    Stack
                  </label>
                  <input
                    className="form__input form__input--number"
                    type="number"
                    id="heroStack"
                    autoComplete="off"
                    required
                    onChange={onChangeData}
                    max={999}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="heroCard1">
                    Hand
                  </label>
                  <div className="form__hand-container">
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="heroCard1"
                      autoComplete="off"
                      required
                      onChange={onChangeData}
                      maxLength={2}
                    />
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="heroCard2"
                      autoComplete="off"
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
                    Position
                  </label>
                  <select
                    className="form__input form__input--selector"
                    id="villainPosition"
                    autoComplete="off"
                    required
                    onChange={onChangeData}
                  >
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
                  </select>
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="villainStack">
                    Stack
                  </label>
                  <input
                    className="form__input form__input--number"
                    type="number"
                    id="villainStack"
                    autoComplete="off"
                    required
                    onChange={onChangeData}
                    max={999}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="villainCard1">
                    Hand
                  </label>
                  <div className="form__hand-container">
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="villainCard1"
                      autoComplete="off"
                      required
                      onChange={onChangeData}
                      maxLength={2}
                    />
                    <input
                      className="form__input form__input--hand"
                      type="text"
                      id="villainCard2"
                      autoComplete="off"
                      required
                      onChange={onChangeData}
                      maxLength={2}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="handName" className="form__label">
                Hand name
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="handName"
                autoComplete="off"
                required
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
              <label className="form__label" htmlFor="preflopActions">
                Actions
              </label>
              <input
                className="form__input form__input--text"
                type="text"
                id="preflopActions"
                autoComplete="off"
                required
                onChange={onChangeData}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="preFlopPot">
                Pot
              </label>
              <input
                className="form__input"
                type="number"
                id="preFlopPot"
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
                  autoComplete="off"
                  onChange={onChangeData}
                />
                <input
                  className="form__input form__input--hand"
                  type="text"
                  id="flopCard2"
                  autoComplete="off"
                  onChange={onChangeData}
                />
                <input
                  className="form__input form__input--hand"
                  type="text"
                  id="flopCard2"
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
                Winner
              </label>
              <select
                className="form__input form__input--winner-selector"
                id="gameWinner"
                autoComplete="off"
                required
                onChange={onChangeData}
              >
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
          </section>
          <div className="form__footer">
            <ArrowBackIcon
              data-testid="previous-third-page"
              className="form__icon"
              onClick={() => setCurrentPage(2)}
            />
            <ButtonStyled className="form__button" type="submit">
              <DoneIcon className="form__icon" />
            </ButtonStyled>
          </div>
        </>
      )}
    </CreateFormStyled>
  );
};
export default CreateForm;
