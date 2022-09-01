import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import HeaderStyled from "./HeaderStyled";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentPage: "register" | "login" | "hands" | "details" | "create";
}
const Header = ({ currentPage }: HeaderProps): JSX.Element => {
  const parsedHeading = currentPage[0].toUpperCase() + currentPage.slice(1);
  return (
    <HeaderStyled className="header-container">
      <>
        <div className="header-container__item">
          {currentPage === "register" && (
            <Link to={`/login`}>
              <KeyboardArrowLeftIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
          {currentPage === "details" && (
            <Link to={`/hands`}>
              <KeyboardArrowLeftIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
          {currentPage === "create" && (
            <Link to={`/hands`}>
              <KeyboardArrowLeftIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
          {currentPage === "hands" && (
            <Link to={`/create`}>
              <AddIcon className="header-container__icon header-container__icon--left" />
            </Link>
          )}
        </div>
        <div className="header-container__item-heading">
          <h1 className="header-container__heading">{parsedHeading}</h1>
        </div>
        <div className="header-container__item">
          {currentPage === "hands" && (
            <PersonIcon className="header-container__icon header-container__icon--right" />
          )}
          {currentPage === "details" && (
            <EditIcon className="header-container__icon header-container__icon--right" />
          )}
        </div>
      </>
    </HeaderStyled>
  );
};
export default Header;
