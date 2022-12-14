import { Alert, Snackbar } from "@mui/material";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import GlobalStyles, { MainContainerStyled } from "./styles/GlobalStyles";
import CloseIcon from "@mui/icons-material/Close";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { closeAlertActionCreator } from "./features/ui/slices/uiSlice";
import HomePage from "./pages/HomePage/HomePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import EditPage from "./pages/EditPage/EditPage";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);
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
          <Route
            path="/hand/edit/:handId"
            element={token ? <EditPage /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Snackbar
          open={ui.isAlertShown}
          disableWindowBlurListener
          transitionDuration={100}
          autoHideDuration={4000}
          onClose={() => dispatch(closeAlertActionCreator())}
        >
          <Alert
            onClick={() => {
              dispatch(closeAlertActionCreator());
            }}
            className="alert"
            action={<CloseIcon fontSize="inherit" />}
          >
            {ui.alertMessage}
          </Alert>
        </Snackbar>
        {ui.isLoadingShown && <CircularProgress className="loading" />}
      </MainContainerStyled>
    </>
  );
}

export default App;
