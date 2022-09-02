import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import GlobalStyles from "../styles/GlobalStyles";

interface WrapperProps {
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children }: WrapperProps): JSX.Element => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyles />
        {children}
      </BrowserRouter>
    </Provider>
  );
};

export default Wrapper;
