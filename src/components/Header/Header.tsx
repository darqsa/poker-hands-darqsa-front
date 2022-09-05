import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import HeaderStyled from "./HeaderStyled";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import useUserApi from "../../features/users/hooks/useUserApi";
import { useMediaQuery } from "@mui/material";

const Header = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const [isProfileShown, setIsProfileShown] = useState(true);
  const { logout } = useUserApi();
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:700px)");

  const logoutUser = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <HeaderStyled className="header-container">
      <div className="header-container__container">
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
          {pathname === "/home" && matches && (
            <>
              <div
                data-testid="hover-container"
                onMouseOver={() => setIsProfileShown(false)}
                onMouseOut={() => setIsProfileShown(true)}
                className="header-container__current-user"
              >
                {isProfileShown ? (
                  <>
                    <PersonIcon
                      data-testid="user"
                      className="header-container__icon header-container__icon--right"
                    />
                    <span className="header-container__current-user-text">
                      {user.username}
                    </span>
                  </>
                ) : (
                  <Link
                    onClick={logoutUser}
                    to={"/login"}
                    className="header-container__logout"
                  >
                    <span className="header-container__current-user-text">
                      <LogoutIcon className="header-container__icon header-container__icon--right" />
                      logout
                    </span>
                  </Link>
                )}
              </div>
            </>
          )}
          {pathname === "/home" && !matches && (
            <PersonIcon
              data-testid="user"
              className="header-container__icon"
              onClick={() => setIsProfileShown(!isProfileShown)}
            />
          )}
          {pathname === "/details" && (
            <EditIcon data-testid="edit" className="header-container__icon" />
          )}
        </div>
      </div>
      {!matches && !isProfileShown && (
        <div className="header-container__profile-mobile">
          <span className="header-container__current-user-text">
            Logged as {user.username}
          </span>
          <Link
            onClick={logoutUser}
            to={"/login"}
            className="header-container__logout"
          >
            <span className="header-container__current-user-text">
              <LogoutIcon
                data-testid="logout"
                className="header-container__icon header-container__icon--right"
              />
              logout
            </span>
          </Link>
        </div>
      )}
    </HeaderStyled>
  );
};
export default Header;
