import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import Header from "./components/Header/Header";
import { loginUserActionCreator } from "./features/users/slices/userSlice";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import fetchToken from "./utils/auth";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  if (token) {
    const user = fetchToken(token);
    dispatch(loginUserActionCreator(user));
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
