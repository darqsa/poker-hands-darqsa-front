import { Link } from "react-router-dom";
import Login from "../components/Login/Login";

const RegisterPage = (): JSX.Element => {
  return (
    <>
      <Login />
      <span>You have no account yet? Register </span>
      <Link to={`/register`}>
        <span>here</span>
      </Link>
    </>
  );
};
export default RegisterPage;
