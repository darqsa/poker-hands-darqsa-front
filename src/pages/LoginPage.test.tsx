import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../app/store";

describe("Given a login page component", () => {
  describe("When invoked", () => {
    test("Then it should match the snapshot", () => {
      const expectedRegisterPage = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      );

      expect(expectedRegisterPage).toMatchSnapshot();
    });
  });
});
