import { useState } from "react";

const CreateForm = (): JSX.Element => {
  const initialState = {
    heroInfo: {
      heroPosition: "",
      heroStack: 0,
      heroHand1: "",
      heroHand2: "",
    },
    villainInfo: {
      villainPosition: "",
      villainStack: 0,
      villainHand1: "",
      villainHand2: "",
    },
  };
  const [formData, setFormData] = useState(initialState);

  const onHeroChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      heroInfo: { ...formData.heroInfo, [event.target.id]: event.target.value },
      villainInfo: { ...formData.villainInfo },
    });
  };

  const onVillainChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      villainInfo: {
        ...formData.villainInfo,
        [event.target.id]: event.target.value,
      },
      heroInfo: { ...formData.heroInfo },
    });
  };

  return (
    <section className="form">
      <h2 className="form__title">Game info</h2>
      <form className="form__form-container">
        <section className="form__section">
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
              onChange={onHeroChangeData}
            />
            <datalist
              className="form__selection-list"
              id="select-hero-position"
            >
              <option value="SB" className="form__list-option" />
              <option value="BB" className="form__list-option" />
              <option value="UTG" className="form__list-option" />
              <option value="MP" className="form__list-option" />
              <option value="CO" className="form__list-option" />
              <option value="BTN" className="form__list-option" />
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
              onChange={onHeroChangeData}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="heroHand1">
              Hand:
            </label>
            <input
              className="form__input"
              type="text"
              id="heroHand1"
              autoComplete="off"
              required
              onChange={onHeroChangeData}
            />
            <input
              className="form__input"
              type="text"
              id="heroHand2"
              autoComplete="off"
              required
              onChange={onHeroChangeData}
            />
          </div>
        </section>
        <section className="form__section">
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
              onChange={onVillainChangeData}
            />
            <datalist
              className="form__selection-list"
              id="select-villain-position"
            >
              <option value="SB" className="form__list-option" />
              <option value="BB" className="form__list-option" />
              <option value="UTG" className="form__list-option" />
              <option value="MP" className="form__list-option" />
              <option value="CO" className="form__list-option" />
              <option value="BTN" className="form__list-option" />
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
              onChange={onVillainChangeData}
            />
          </div>
          <div className="form__field">
            <label className="form__label" htmlFor="villainHand1">
              Hand:
            </label>
            <input
              className="form__input"
              type="text"
              id="villainHand1"
              autoComplete="off"
              required
              onChange={onVillainChangeData}
            />
            <input
              className="form__input"
              type="text"
              id="villainHand2"
              autoComplete="off"
              required
              onChange={onVillainChangeData}
            />
          </div>
        </section>
      </form>
    </section>
  );
};
export default CreateForm;
