import { HandData } from "../../features/hands/models/Hand";

interface HandDetailsProps {
  hand: HandData;
}
const HandDetails = ({ hand }: HandDetailsProps): JSX.Element => {
  return <h1>{hand.handName}</h1>;
};
export default HandDetails;
