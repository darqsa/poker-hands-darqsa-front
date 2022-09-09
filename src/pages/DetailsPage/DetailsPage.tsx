import { useParams } from "react-router-dom";

const DetailsPage = (): JSX.Element => {
  const { handId } = useParams();
  return <>{handId}</>;
};
export default DetailsPage;
