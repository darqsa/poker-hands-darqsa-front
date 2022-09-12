import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import { completeFakeHand, fakeHand } from "../../test-utils/mocks/mockHand";
import Hand from "./Hand";

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

let mockDeleteFunction = { deleteHand: jest.fn() };
jest.mock(
  "../../features/hands/hooks/useHandsApi",
  () => () => mockDeleteFunction
);

describe("Given a hand component", () => {
  describe("When it receives a finishedFakeHand as pros", () => {
    test("Then it shouldnt render any flop, turn and river hand", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Hand hand={fakeHand} />
          </Provider>
        </BrowserRouter>
      );

      const expectedNumberOfImages = 2;
      const images = screen.getAllByRole("img");
      const renderedImages = [
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[0]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[1]} poker hand.`,
        }),
      ];

      expect(images).toHaveLength(expectedNumberOfImages);
      renderedImages.forEach((item) => expect(item).toBeInTheDocument());
    });
  });

  describe("When it receives a completeFakeHand as props", () => {
    test("Then it should render 2 hero cards, the hand name and the board hands", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Hand hand={completeFakeHand} />
          </Provider>
        </BrowserRouter>
      );
      const handItems = [
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[0]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[1]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.game.flop?.board[1]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.game.flop?.board[2]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.game.turn?.board} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.game.river?.board} poker hand.`,
        }),
      ];
      handItems.forEach((item) => expect(item).toBeInTheDocument());
    });

    test("Then it should render a 'more' button that renders a delete icon on click that calls deleteHand function", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Hand hand={completeFakeHand} />
          </Provider>
        </BrowserRouter>
      );
      const moreVert = screen.getByTestId("more-vert");
      await userEvent.click(moreVert);

      const deleteButton = screen.getByTestId("delete");
      await userEvent.click(deleteButton);

      expect(mockDeleteFunction.deleteHand).toHaveBeenCalled();
    });

    test("Then it should render a 'more' button that renders a edit icon on click that calls deleteHand function", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Hand hand={completeFakeHand} />
          </Provider>
        </BrowserRouter>
      );
      const moreVert = screen.getByTestId("more-vert");
      await userEvent.click(moreVert);

      const editButton = screen.getByTestId("EditIcon");
      await userEvent.click(editButton);

      const expectedText = screen.getByText(completeFakeHand.handName);

      expect(expectedText).toBeInTheDocument();
    });
  });
});
