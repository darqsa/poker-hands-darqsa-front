import { Link } from "react-router-dom";
import ButtonStyled from "../../styles/ButtonStyled";
import NotFoundStyled from "./NotFoundPageStyled";

const NotFoundPage = (): JSX.Element => {
  return (
    <NotFoundStyled className="not-found-container">
      <h2 className="not-found-container__text">Page not found</h2>
      <Link to={`/home`}>
        <ButtonStyled className="not-found-container__redirect-button">
          Go back to home page
        </ButtonStyled>
      </Link>
    </NotFoundStyled>
  );
};
export default NotFoundPage;
