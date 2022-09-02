import { Link } from "react-router-dom";
import Login from "../../components/Login/Login";
import ButtonStyled from "../../styles/ButtonStyled";
import LinkContainerStyled from "./LoginPageStyled";

const LoginPage = (): JSX.Element => {
  return (
    <>
      <Login />
      <LinkContainerStyled className="login-text-container">
        <span className="login-text-container__text">
          You have no account yet? Register{" "}
          <Link to={`/register`}>
            <ButtonStyled className="login-text-container__register-link">
              here
            </ButtonStyled>
          </Link>
        </span>
      </LinkContainerStyled>
    </>
  );
};
export default LoginPage;
