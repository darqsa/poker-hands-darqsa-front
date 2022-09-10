import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { fakeHand } from "../../test-utils/mocks/mockHand";
import mockStore from "../../test-utils/mocks/mockStore";
import DetailsPage from "./DetailsPage";

let mockGetByIdFunction = { loadHandById: jest.fn().mockReturnValue(fakeHand) };
jest.mock(
  "../../features/hands/hooks/useHandsApi",
  () => () => mockGetByIdFunction
);

describe("Gien a DetailsPage component", () => {
  describe("When it's called and gets a fakeHand", () => {
    test("Then it should render a HandDetails component with the fakeHand inside", () => {
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <DetailsPage />
          </Provider>
        </BrowserRouter>
      );

      const expectedHeading = screen.getByRole("heading", {
        name: "Game Info",
      });

      expect(expectedHeading).toBeInTheDocument();
    });
  });
});
