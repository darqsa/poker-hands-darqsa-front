import { useAppDispatch } from "../../app/hooks";
import { loginUserActionCreator } from "../../features/users/slices/userSlice";
import fetchToken from "../../utils/auth";
import HomeContainerStyled from "./HomePageStyled";

const HomePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  if (token) {
    const user = fetchToken(token);
    dispatch(loginUserActionCreator(user));
  }

  return (
    <HomeContainerStyled className="home-container">
      <p className="home-container__no-hands-text">
        You currently have no hands in your list... Try clicking at the top-left
        icon to create a new hand.
      </p>
    </HomeContainerStyled>
  );
};
export default HomePage;
