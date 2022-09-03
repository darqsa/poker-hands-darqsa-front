import { Alert, IconButton } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header/Header";
import { loginUserActionCreator } from "./features/users/slices/userSlice";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GlobalStyles, { MainContainerStyled } from "./styles/GlobalStyles";
import fetchToken from "./utils/auth";
import CloseIcon from "@mui/icons-material/Close";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { closeAlertActionCreator } from "./features/users/slices/alertSlice";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./components/Profile/Profile";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);

  if (token) {
    const user = fetchToken(token);
    dispatch(loginUserActionCreator(user));
  }

  return (
    <>
      <GlobalStyles />
      <Header />
      <Profile />
      <MainContainerStyled>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/register"
            element={token ? <Navigate to="/home" /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/home"
            element={token ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {alert.isAlertShown && (
          <Alert
            onClick={() => {
              dispatch(closeAlertActionCreator());
            }}
            className="alert"
            action={
              <IconButton aria-label="close" color="inherit" size="small">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alert.alertMessage}
          </Alert>
        )}
      </MainContainerStyled>
    </>
  );
}

export default App;
