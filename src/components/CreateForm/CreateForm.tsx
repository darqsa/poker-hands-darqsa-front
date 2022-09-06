import { useState } from "react";
import ButtonStyled from "../../styles/ButtonStyled";

const CreateForm = (): JSX.Element => {
  const [gameInfo, setGameInfo] = useState({});
  const [preflop, setPreflop] = useState({});
  const [flop, setFlop] = useState({});
  const [turn, setTurn] = useState({});
  const [river, setRiver] = useState({});
  const [endInfo, setendInfo] = useState({});

  const onChangeGameInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameInfo({
      ...gameInfo,
      [event.target.id]: event.target.value,
    });
  };

  const onChangePreFlopInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPreflop({
      ...preflop,
      [event.target.id]: event.target.value,
    });
  };

  const onChangeFlopInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlop({
      ...flop,
      [event.target.id]: event.target.value,
    });
  };

  const onChangeTurnInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTurn({
      ...turn,
      [event.target.id]: event.target.value,
    });
  };

  const onChangeRiverInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRiver({
      ...river,
      [event.target.id]: event.target.value,
    });
  };

  const onChangeEndInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setendInfo({
      ...endInfo,
      [event.target.id]: event.target.value,
    });
  };

  // const gameInfoRequirements = formData.
  return (
    <section className="form">
      <h2 className="form__title">Game info</h2>
      <form className="form__form-container">
        <section className="form__section">
          <div className="form__player-container">
            <h3 className="form__field-heading">Hero</h3>
            <div className="form__field">
              <label className="form__label" htmlFor="heroPosition">
                Position:
              </label>
              <input
                className="form__input"
                list="select-hero-position"
                id="heroPosition"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
              />
              <datalist
                className="form__selection-list"
                id="select-hero-position"
              >
                <option value={0} className="form__list-option" />
                <option value={1} className="form__list-option" />
                <option value={2} className="form__list-option" />
                <option value={3} className="form__list-option" />
                <option value={4} className="form__list-option" />
                <option value={5} className="form__list-option" />
              </datalist>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="heroStack">
                Stack:
              </label>
              <input
                className="form__input"
                type="number"
                id="heroStack"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
                max={999}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="heroCard1">
                Hand:
              </label>
              <input
                className="form__input"
                type="text"
                id="heroCard1"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
              />
              <input
                className="form__input"
                type="text"
                id="heroCard2"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
              />
            </div>
          </div>
          <div className="form__player-container">
            <h3 className="form__field-heading">Villain</h3>
            <div className="form__field">
              <label className="form__label" htmlFor="villainPosition">
                Position:
              </label>
              <input
                className="form__input"
                list="select-villain-position"
                id="villainPosition"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
              />
              <datalist
                className="form__selection-list"
                id="select-villain-position"
              >
                <option value={0} className="form__list-option" />
                <option value={1} className="form__list-option" />
                <option value={2} className="form__list-option" />
                <option value={3} className="form__list-option" />
                <option value={4} className="form__list-option" />
                <option value={5} className="form__list-option" />
              </datalist>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="villainStack">
                Stack:
              </label>
              <input
                className="form__input"
                type="number"
                id="villainStack"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
                max={999}
              />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="villainCard1">
                Hand:
              </label>
              <input
                className="form__input"
                type="text"
                id="villainCard1"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
              />
              <input
                className="form__input"
                type="text"
                id="villainCard2"
                autoComplete="off"
                required
                onChange={onChangeGameInfo}
              />
            </div>
          </div>
        </section>
        <section className="form__section">
          <h2 className="form__title">Preflop</h2>
          <div className="form__field">
            <label className="form__label" htmlFor="preflopActions">
              Actions
            </label>
            <input
              className="form__input"
              type="text"
              id="preflopActions"
              autoComplete="off"
              required
              onChange={onChangePreFlopInfo}
            />
          </div>
        </section>
        <section className="form__section">
          <h2 className="form__title">Flop</h2>
          <div className="form__field">
            <label className="form__label" htmlFor="flopCard1">
              Board
            </label>
            <input
              className="form__input"
              type="text"
              id="flopCard1"
              autoComplete="off"
              onChange={onChangeFlopInfo}
            />
            <input
              className="form__input"
              type="text"
              id="flopCard2"
              autoComplete="off"
              onChange={onChangeFlopInfo}
            />
            <input
              className="form__input"
              type="text"
              id="flopCard2"
              autoComplete="off"
              onChange={onChangeFlopInfo}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="flopActions">
              Actions
            </label>
            <input
              className="form__input"
              type="text"
              id="flopActions"
              autoComplete="off"
              onChange={onChangeFlopInfo}
            />
          </div>
        </section>
        <section className="form__section">
          <h2 className="form__title">Turn</h2>
          <div className="form__field">
            <label className="form__label" htmlFor="turnCard">
              Board
            </label>
            <input
              className="form__input"
              type="text"
              id="turnCard"
              autoComplete="off"
              onChange={onChangeTurnInfo}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="turnActions">
              Actions
            </label>
            <input
              className="form__input"
              type="text"
              id="turnActions"
              autoComplete="off"
              onChange={onChangeTurnInfo}
            />
          </div>
        </section>
        <section className="form__section">
          <h2 className="form__title">River</h2>
          <div className="form__field">
            <label className="form__label" htmlFor="riverCard">
              Board
            </label>
            <input
              className="form__input"
              type="text"
              id="riverCard"
              autoComplete="off"
              onChange={onChangeRiverInfo}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="riverActions">
              Actions
            </label>
            <input
              className="form__input"
              type="text"
              id="riverActions"
              autoComplete="off"
              onChange={onChangeRiverInfo}
            />
          </div>
        </section>
        <section className="form__section">
          <h2 className="form__title">Post game</h2>
          <div className="form__field">
            <label className="form__label" htmlFor="gameWinner">
              Winner
            </label>
            <input
              list="winner"
              className="form__input"
              type="text"
              id="gameWinner"
              autoComplete="off"
              required
              onChange={onChangeEndInfo}
            />
            <datalist className="form__selection-list" id="winner">
              <option value="hero" className="form__list-option" />
              <option value="villain" className="form__list-option" />
            </datalist>
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="handDescription">
              Description
            </label>
            <input
              className="form__input"
              type="text"
              id="handDescription"
              autoComplete="off"
              onChange={onChangeEndInfo}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="handImage">
              Image
            </label>
            <input
              className="form__input"
              type="file"
              id="handImage"
              autoComplete="off"
              onChange={onChangeEndInfo}
            />
          </div>
        </section>
        <ButtonStyled className="form__button" type="submit">
          Create Hand
        </ButtonStyled>
      </form>
    </section>
  );
};
export default CreateForm;
