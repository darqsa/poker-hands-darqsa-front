import { useAppSelector } from "../../app/hooks";
import SideBarStyled from "./ProfileStyled";

const Profile = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  return (
    <SideBarStyled className="sidebar">
      <div className="sidebar__profile-container">
        <span className="sidebar__current-user">
          Logged as
          <strong> {user.username}</strong>
        </span>
        <button className="sidebar__logout-button">Logout</button>
      </div>
    </SideBarStyled>
  );
};
export default Profile;
