import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useUserApi from "../../features/users/hooks/useUserApi";
import SideBarStyled from "./ProfileStyled";

const Profile = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const { logout } = useUserApi();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logout();
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      {user.username && (
        <SideBarStyled className="sidebar">
          <div className="sidebar__profile-container">
            <span className="sidebar__current-user">
              Logged as <strong>{user.username}</strong>
            </span>
            <Link to={"/login"}>
              <button className="sidebar__logout-button" onClick={logoutUser}>
                Logout
              </button>
            </Link>
          </div>
        </SideBarStyled>
      )}
    </>
  );
};
export default Profile;
