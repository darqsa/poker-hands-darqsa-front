import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HandDetails from "../../components/HandDetails/HandDetails";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import { HandData } from "../../features/hands/models/Hand";

const DetailsPage = (): JSX.Element => {
  const initialState: HandData = {
    handName: "",
    preGame: {
      hero: { initialStack: 0, hand: ["", ""], position: 0 },
      villains: [{ hand: ["", ""], initialStack: 0, position: 0 }],
    },
    game: {
      preFlop: { actions: [""], pot: 0 },
      flop: { actions: [""], board: ["", "", ""], pot: 0 },
      turn: { actions: [""], board: "", pot: 0 },
      river: { actions: [""], board: "", pot: 0 },
    },
    postGame: {
      finalPot: 0,
      gameWinner: "",
      handDescription: "",
      handImage: "",
    },
  };
  const { handId } = useParams();
  const { loadHandById } = useHandsApi();
  const [hand, setHand] = useState(initialState);

  useEffect(() => {
    (async () => {
      const idHand: HandData = await loadHandById(handId!);
      setHand(idHand);
    })();
  }, [loadHandById, handId]);
  return <HandDetails hand={hand} />;
};
export default DetailsPage;
