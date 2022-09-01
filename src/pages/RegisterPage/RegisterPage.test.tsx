import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("Given a register page component", () => {
  describe("When invoked", () => {
    test("Then it should match the snapshot", () => {
      const expectedRegisterPage = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <RegisterPage />
          </BrowserRouter>
        </Provider>
      );

      expect(expectedRegisterPage).toMatchSnapshot();
    });
  });
});
