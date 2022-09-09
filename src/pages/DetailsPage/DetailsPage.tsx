import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HandDetails from "../../components/HandDetails/HandDetails";
import useHandsApi from "../../features/hands/hooks/useHandsApi";
import { HandData } from "../../features/hands/models/Hand";

const DetailsPage = (): JSX.Element => {
  const { handId } = useParams();
  const { loadHandById } = useHandsApi();
  const [hand, setHand] = useState({} as HandData);

  useEffect(() => {
    (async () => {
      const idHand: HandData = await loadHandById(handId as string);
      setHand(idHand);
    })();
  }, [loadHandById, handId]);

  return <HandDetails hand={hand} />;
};
export default DetailsPage;
