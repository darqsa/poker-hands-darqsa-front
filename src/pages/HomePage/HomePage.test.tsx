import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import HomePage from "./HomePage";

describe("Given a home page component", () => {
  describe("When invoked", () => {
    test("Then it should match the snapshot", () => {
      const expectedHomePage = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <HomePage />
          </BrowserRouter>
        </Provider>
      );

      expect(expectedHomePage).toMatchSnapshot();
    });
  });
});
