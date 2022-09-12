import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import EditPage from "./EditPage";

describe("Given a edit page component", () => {
  describe("When invoked", () => {
    test("Then it should match the snapshot", () => {
      const expectedEditPage = renderer.create(
        <Provider store={store}>
          <BrowserRouter>
            <EditPage />
          </BrowserRouter>
        </Provider>
      );

      expect(expectedEditPage).toMatchSnapshot();
    });
  });
});
