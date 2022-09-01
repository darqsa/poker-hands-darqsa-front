import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import HeaderStyled from "./HeaderStyled";
import { Link, useLocation } from "react-router-dom";

const Header = (): JSX.Element => {
  let { pathname } = useLocation();

  const parsedHeading = pathname[1].toUpperCase() + pathname.slice(2);
  return (
    <HeaderStyled className="header-container">
      <>
        <div className="header-container__item">
          {pathname === "/register" && (
            <Link to={`/login`}>
              <KeyboardArrowLeftIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
          {pathname === "/details" && (
            <Link to={`/hands`}>
              <KeyboardArrowLeftIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
          {pathname === "/create" && (
            <Link to={`/hands`}>
              <KeyboardArrowLeftIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
          {pathname === "/hands" && (
            <Link to={`/create`}>
              <AddIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
        </div>
        <div className="header-container__item-heading">
          <h1 className="header-container__heading">{parsedHeading}</h1>
        </div>
        <div className="header-container__item">
          {pathname === "/hands" && (
            <PersonIcon className="header-container__icon header-container__icon--right" />
          )}
          {pathname === "/details" && (
            <EditIcon className="header-container__icon header-container__icon--right" />
          )}
        </div>
      </>
    </HeaderStyled>
  );
};
export default Header;
