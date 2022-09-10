import { render, screen } from "@testing-library/react";
import { completeFakeHand } from "../../test-utils/mocks/mockHand";
import HandDetails from "./HandDetails";

describe("Given a HandDetails component", () => {
  describe("When receives a completeFakeHand by props", () => {
    test("Then it should render every property from the completeFakeHand object", () => {
      render(<HandDetails hand={completeFakeHand} />);

      const positions = ["SB", "BB", "UTG", "MP", "CO", "BTN"];
      const hand = [
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[0]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.hero.hand[1]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.villains[0].hand[0]} poker hand.`,
        }),
        screen.getByRole("img", {
          name: `The ${completeFakeHand.preGame.villains[0].hand[1]} poker hand.`,
        }),
        screen.getByRole("heading", { name: completeFakeHand.handName }),
        screen.getByText(
          `(${positions[completeFakeHand.preGame.hero.position - 1]}) Hero - ${
            completeFakeHand.preGame.hero.initialStack
          }bb`
        ),
        screen.getByText(`${completeFakeHand.postGame.handDescription}`),
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
        screen.getByRole("img", {
          name: `Hand extra info by user`,
        }),
      ];

      hand.forEach((item) => expect(item).toBeInTheDocument());
    });
  });
});
