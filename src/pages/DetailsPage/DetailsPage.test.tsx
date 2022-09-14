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

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Gien a DetailsPage component", () => {
  describe("When it's called and gets a fakeHand and a valid handId as params", () => {
    test("Then it should render a HandDetails component with the fakeHand inside", () => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <DetailsPage />
          </BrowserRouter>
        </Provider>
      );

      const expectedHeading = screen.getByRole("heading", {
        name: "Game Info",
      });

      expect(expectedHeading).toBeInTheDocument();
    });
  });

  describe("When it's called and gets a fakeHand and an invalid handId", () => {
    test("Then it should call the loadHandById function with undefined", () => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <DetailsPage />
          </BrowserRouter>
        </Provider>
      );

      expect(mockGetByIdFunction.loadHandById).toHaveBeenCalledWith(undefined);
    });
  });
});
