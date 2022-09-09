import { Alert, IconButton } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GlobalStyles, { MainContainerStyled } from "./styles/GlobalStyles";
import CloseIcon from "@mui/icons-material/Close";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { closeAlertActionCreator } from "./features/ui/slices/alertSlice";
import HomePage from "./pages/HomePage/HomePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

function App() {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);
  const token = localStorage.getItem("token");
  useNavigate();

  return (
    <>
      <GlobalStyles />
      <Header />
      <MainContainerStyled>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />
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
          <Route
            path="/create"
            element={token ? <CreatePage /> : <Navigate to="/login" />}
          />
          <Route path="/hand/:handId" element={<DetailsPage />} />
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
