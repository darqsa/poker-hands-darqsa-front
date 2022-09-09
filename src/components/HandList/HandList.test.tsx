import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockStore, { emptyMockStore } from "../../test-utils/mocks/mockStore";
import HandList from "./HandList";

describe("Given a Hand List component", () => {
  describe("When invoked and gets a fakeHand as array content", () => {
    test("Then it should render as much list items as it receives", () => {
      render(
        <BrowserRouter>
          <Provider store={mockStore}>
            <HandList />
          </Provider>
        </BrowserRouter>
      );

      const hands = screen.getAllByTestId("more-vert");

      hands.forEach((hand) => expect(hand).toBeInTheDocument());
    });
  });

  describe("When invoked and gets an empty array", () => {
    test("Then it should render a text that says that there are no hands", () => {
      const text =
        "You currently have no hands in your list... Try clicking at the top-left icon to create a new hand.";
      render(
        <BrowserRouter>
          <Provider store={emptyMockStore}>
            <HandList />
          </Provider>
        </BrowserRouter>
      );

      const expectedText = screen.getByText(text);

      expect(expectedText).toBeInTheDocument();
    });
  });
});
