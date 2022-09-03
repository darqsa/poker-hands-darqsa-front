import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUserActionCreator } from "../../features/users/slices/userSlice";
import SideBarStyled from "./ProfileStyled";

const Profile = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const logOutUser = () => {
    dispatch(logoutUserActionCreator());
  };

  return (
    <SideBarStyled className="sidebar">
      <div className="sidebar__profile-container">
        <span className="sidebar__current-user">
          Logged as
          <strong> {user.username}</strong>
        </span>
        <Link to={"/login"}>
          <button className="sidebar__logout-button" onClick={logOutUser}>
            Logout
          </button>
        </Link>
      </div>
    </SideBarStyled>
  );
};
export default Profile;
