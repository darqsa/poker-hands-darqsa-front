import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockStore from "../../test-utils/mocks/mockStore";
import HandList from "./HandList";

describe("Given a Hand List component", () => {
  describe("When invoked and gets a fakeHand as array content", () => {
    test("Then it should render as much list items as it receives", () => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <HandList />
          </BrowserRouter>
        </Provider>
      );

      const hands = screen.getAllByTestId("MoreVertIcon");

      hands.forEach((hand) => expect(hand).toBeInTheDocument());
    });
  });
});
