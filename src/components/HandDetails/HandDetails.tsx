import { HandData } from "../../features/hands/models/Hand";

interface HandDetailsProps {
  hand: HandData;
}
const HandDetails = ({ hand }: HandDetailsProps): JSX.Element => {
  const handRoute = "../img/pokerCards/";
  const positions = ["SB", "BB", "UTG", "MP", "CO", "BTN"];

  return (
    <div className="details">
      <div className="details__hand-header">
        <div className="details__img-group">
          <img
            height={75}
            width={56.5}
            src={`${handRoute}${hand.preGame.hero.hand[0]}.webp`}
            alt={`The ${hand.preGame.hero.hand[0]} poker hand.`}
            className="details__hero-card"
          />
          <img
            height={75}
            width={56.5}
            src={`${handRoute}${hand.preGame.hero.hand[1]}.webp`}
            alt={`The ${hand.preGame.hero.hand[1]} poker hand.`}
            className="details__hero-card"
          />
        </div>
        <h2 className="details__name">{hand.handName}</h2>
      </div>
      <article className="details__info-container">
        <section className="details__game-section">
          <h3 className="details__section-heading">Game Info</h3>
          <span className="details__info">{`(${
            positions[hand.preGame.hero.position - 1]
          }) Hero - ${hand.preGame.hero.initialStack}bb`}</span>
          <span className="details__info">{`(${
            positions[hand.preGame.villains[0].position - 1]
          }) Villain - ${hand.preGame.villains[0].initialStack}bb`}</span>
          {hand.postGame.handDescription && (
            <p className="details__info">
              <strong>Description: </strong>
              {hand.postGame.handDescription}
            </p>
          )}
        </section>
        <section className="details__game-section">
          <h3 className="details__section-heading">Preflop</h3>
          <span className="details__info">
            <strong>Action:</strong> {hand.game.preFlop.actions[0]}
          </span>
          <span className="details__info">
            <strong>Pot:</strong>
            {`${hand.game.preFlop.pot}bb`}
          </span>
        </section>
        {hand.game.flop && (
          <section className="details__game-section">
            <h3 className="details__section-heading">Flop</h3>
            <div className="details__board-img-group">
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[0]}.webp`}
                alt={`The ${hand.game.flop?.board[0]} poker hand.`}
              />
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop?.board[1]}.webp`}
                alt={`The ${hand.game.flop?.board[1]} poker hand.`}
              />
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.flop.board[2]}.webp`}
                alt={`The ${hand.game.flop.board[2]} poker hand.`}
              />
            </div>
            <span className="details__info">
              <strong>Action:</strong> {hand.game.flop.actions[0]}
            </span>
            <span className="details__info">
              <strong>Pot:</strong>
              {`${hand.game.flop.pot}bb`}
            </span>
          </section>
        )}
        {hand.game.turn && (
          <section className="details__game-section">
            <h3 className="details__section-heading">Turn</h3>
            <div className="details__board-img-group">
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.turn.board}.webp`}
                alt={`The ${hand.game.turn.board} poker hand.`}
              />
            </div>{" "}
            <span className="details__info">
              <strong>Action:</strong> {hand.game.turn.actions[0]}
            </span>
            <span className="details__info">
              <strong>Pot:</strong>
              {`${hand.game.turn.pot}bb`}
            </span>
          </section>
        )}
        {hand.game.river && (
          <section className="details__game-section">
            <h3 className="details__section-heading">River</h3>
            <div className="details__board-img-group">
              <img
                height={60}
                width={45.2}
                className="hand__board-card"
                src={`${handRoute}${hand.game.river.board}.webp`}
                alt={`The ${hand.game.river.board} poker hand.`}
              />
            </div>{" "}
            <span className="details__info">
              <strong>Action:</strong> {hand.game.river.actions[0]}
            </span>
            <span className="details__info">
              <strong>Pot:</strong>
              {`${hand.game.river.pot}bb`}
            </span>
          </section>
        )}
        <section className="details__game-section">
          <span className="details__info">
            {hand.postGame.gameWinner === "hero"
              ? `(${positions[hand.preGame.hero.position - 1]}) Hero won ${
                  hand.postGame.finalPot
                }bb`
              : `(${
                  positions[hand.preGame.villains[0].position - 1]
                }) Villain won ${hand.postGame.finalPot}bb`}
          </span>
        </section>
        {hand.postGame.handImage && (
          <section className="details__game-section">
            <img
              className="hand__description-img"
              src={hand.postGame.handImage}
              alt={`Hand extra info by user`}
            />
          </section>
        )}
      </article>
    </div>
  );
};
export default HandDetails;
