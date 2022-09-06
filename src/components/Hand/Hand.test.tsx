import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { completeFakeHand, fakeHand } from "../../test-utils/mocks/mockHand";
import Hand from "./Hand";

describe("Given a hand component", () => {
  describe("When it receives a finishedFakeHand as pros", () => {
    test("Then it shouldnt render any flop, turn and river hand", () => {
      render(<Hand hand={fakeHand} />);

      const expectedNumberOfImages = 2;
      const images = screen.getAllByRole("img");
      const renderedImages = [
        screen.getByRole("img", {
          name: `The ${fakeHand.preGame.hero.hand[0]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${fakeHand.preGame.hero.hand[1]} poker hand.`,
        }),
      ];

      expect(images).toHaveLength(expectedNumberOfImages);
      renderedImages.forEach((item) => expect(item).toBeInTheDocument());
    });
  });

  describe("When it receives a completeFakeHand as props", () => {
    test("Then it should render 2 hero cards, the hand name and the board hands", () => {
      render(<Hand hand={completeFakeHand} />);

      const handItems = [
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[0]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[1]} poker hand.`,
        }),

        screen.getByText(completeFakeHand.handName),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.game.flop?.board[0]} poker hand.`,
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

    test("Then it should render a 'more' button that renders a delete icon on click", async () => {
      render(<Hand hand={completeFakeHand} />);

      const moreVert = screen.getByTestId("more-vert");
      await userEvent.click(moreVert);

      const expectedDeleteButton = screen.getByTestId("delete");

      expect(expectedDeleteButton).toBeInTheDocument();
    });
  });
});
