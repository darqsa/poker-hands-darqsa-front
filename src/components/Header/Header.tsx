import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import HeaderStyled from "./HeaderStyled";

interface HeaderProps {
  currentPage: "register" | "login";
}
const Header = ({ currentPage }: HeaderProps): JSX.Element => {
  return (
    <HeaderStyled className="header-container">
      {currentPage === "register" && (
        <>
          <KeyboardArrowLeftOutlinedIcon className="header-container__arrow-icon" />
          <h1 className="header-container__heading">{currentPage}</h1>
        </>
      )}
    </HeaderStyled>
  );
};
export default Header;
