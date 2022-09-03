import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import HeaderStyled from "./HeaderStyled";
import { Link, useLocation } from "react-router-dom";

const Header = (): JSX.Element => {
  const { pathname } = useLocation();
  return (
    <HeaderStyled className="header-container">
      <>
        <div className="header-container__item">
          {pathname === "/register" && (
            <Link to={`/login`}>
              <KeyboardArrowLeftIcon
                data-testid="arrow-left"
                className="header-container__icon header-container__icon--left"
              />
            </Link>
          )}
          {pathname === "/details" && (
            <Link to={`/home`}>
              <KeyboardArrowLeftIcon
                data-testid="arrow-left"
                className="header-container__icon header-container__icon--left"
              />
            </Link>
          )}
          {pathname === "/create" && (
            <Link to={`/home`}>
              <KeyboardArrowLeftIcon
                data-testid="arrow-left"
                className="header-container__icon header-container__icon--left"
              />
            </Link>
          )}
          {pathname === "/home" && (
            <Link to={`/create`}>
              <AddIcon
                data-testid="add"
                className="header-container__icon header-container__icon--left"
              />
            </Link>
          )}
        </div>
        <div className="header-container__item-heading">
          <h1 className="header-container__heading">
            {pathname === "/home" && "Hands"}
            {pathname === "/details" && "Details"}
            {pathname === "/create" && "Create"}
            {pathname === "/login" && "Login"}
            {pathname === "/register" && "Register"}
          </h1>
        </div>
        <div className="header-container__item">
          {pathname === "/home" && (
            <PersonIcon
              data-testid="user"
              className="header-container__icon header-container__icon--right"
            />
          )}
          {pathname === "/details" && (
            <EditIcon
              data-testid="edit"
              className="header-container__icon header-container__icon--right"
            />
          )}
        </div>
      </>
    </HeaderStyled>
  );
};
export default Header;
