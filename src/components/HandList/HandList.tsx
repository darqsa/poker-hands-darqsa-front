import { useEffect } from "react";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import Hand from "../Hand/Hand";

const HandList = (): JSX.Element => {
  const { hands, loadHands } = useHandsApi();

  useEffect(() => {
    loadHands();
  }, [loadHands]);
  return (
    <div className="hand-list-container">
      {hands.length !== 0 && (
        <p className="hands-list-container__no-hands-text">
          You currently have no hands in your list... Try clicking at the
          top-left icon to create a new hand.
        </p>
      )}
      <ul className="hand-list-container__list">
        {hands.map((hand) => (
          <li className="hand-list-container__list-item" key={hand.id}>
            <Hand hand={hand} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HandList;
