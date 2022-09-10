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
        </section>
        <section className="details__game-section">
          <h3 className="details__section-heading">Preflop</h3>
          <span className="details__info">{`Action: ${hand.game.preFlop.actions[0]}`}</span>
          <span className="details__info">{`Pot: ${hand.game.preFlop.pot}`}</span>
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
            <span className="details__info">{`Action: ${hand.game.flop.actions[0]}`}</span>
            <span className="details__info">{`Pot: ${hand.game.flop.pot}`}</span>
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
            </div>
            <span className="details__info">{`Action: ${hand.game.turn.actions[0]}`}</span>
            <span className="details__info">{`Pot: ${hand.game.turn.pot}`}</span>
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
            </div>
            <span className="details__info">{`Action: ${hand.game.river.actions[0]}`}</span>
            <span className="details__info">{`Pot: ${hand.game.river.pot}`}</span>
          </section>
        )}
      </article>
      <div className="details__hand-footer">
        <span className="details__info">
          {hand.postGame.gameWinner === "hero"
            ? `(${positions[hand.preGame.hero.position - 1]}) Hero won ${
                hand.postGame.finalPot
              }bb`
            : `(${
                positions[hand.preGame.villains[0].position - 1]
              }) Villain won ${hand.postGame.finalPot}bb`}
        </span>
      </div>
    </div>
  );
};
export default HandDetails;
