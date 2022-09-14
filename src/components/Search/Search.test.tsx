import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { fakeHand } from "../../test-utils/mocks/mockHand";
import Search from "./Search";

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

let mockhandHookFunctions = {
  searchHandByHandName: jest.fn().mockReturnValue([fakeHand]),
  loadHands: jest.fn(),
};
jest.mock(
  "../../features/hands/hooks/useHandsApi",
  () => () => mockhandHookFunctions
);

describe("Given a Search component", () => {
  describe("When invoke and user types a fake handname", () => {
    test("Then it should render a return button", async () => {
      const text = "1234";

      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );

      const input = screen.getByPlaceholderText("Search by name");
      await userEvent.type(input, text);

      const searchButton = screen.getByRole("button", { name: "Search" });
      await userEvent.click(searchButton);

      const returnButton = screen.getByRole("button", { name: "Return" });

      expect(returnButton).toBeInTheDocument();
    });

    test("And the user clicks the return button, it should call the loadHands function", async () => {
      const text = "1234";

      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );

      const input = screen.getByPlaceholderText("Search by name");
      await userEvent.type(input, text);

      const searchButton = screen.getByRole("button", { name: "Search" });
      await userEvent.click(searchButton);

      const returnButton = screen.getByRole("button", { name: "Return" });
      await userEvent.click(returnButton);

      expect(mockhandHookFunctions.loadHands).toHaveBeenCalled();
    });
  });

  describe("When invoke and user types a non existing fake handname", () => {
    test("Then it should render a 'There are no hands with this hand name.' text", async () => {
      mockhandHookFunctions = {
        searchHandByHandName: jest.fn().mockReturnValue(false),
        loadHands: jest.fn(),
      };
      const text = "1234";

      render(
        <Provider store={store}>
          <Search />
        </Provider>
      );
      const noHandsText = "There are no hands with this hand name.";

      const input = screen.getByPlaceholderText("Search by name");
      await userEvent.type(input, text);

      const searchButton = screen.getByRole("button", { name: "Search" });
      await userEvent.click(searchButton);

      const noHands = screen.getByText(noHandsText);

      expect(searchButton).toBeInTheDocument();
      expect(noHands).toBeInTheDocument();
    });
  });
});
