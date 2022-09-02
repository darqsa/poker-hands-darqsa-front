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
import { toggleAlertActionCreator } from "./features/users/slices/alertSlice";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
      <MainContainerStyled>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {alert && (
          <Alert
            className="alert"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(toggleAlertActionCreator());
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Your account has been created successfully! 👍
          </Alert>
        )}
      </MainContainerStyled>
    </>
  );
}

export default App;
