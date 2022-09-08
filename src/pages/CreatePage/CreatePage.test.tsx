import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import CreatePage from "./CreatePage";

describe("Given a create page component", () => {
  describe("When invoked", () => {
    test("Then it should match the snapshot", () => {
      const expectedCreatePage = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <CreatePage />
          </BrowserRouter>
        </Provider>
      );

      expect(expectedCreatePage).toMatchSnapshot();
    });
  });
});
