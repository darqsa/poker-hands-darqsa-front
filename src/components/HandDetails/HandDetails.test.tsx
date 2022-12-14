import { completeFakeHand } from "../../test-utils/mocks/mockHand";
import HandDetails from "./HandDetails";
import renderer from "react-test-renderer";

describe("Given a HandDetails component", () => {
  describe("When receives a completeFakeHand with villain as winner by props", () => {
    test("Then it should render every property from the completeFakeHand object", () => {
      const expectedHandDetails = renderer.create(
        <HandDetails hand={completeFakeHand} />
      );

      expect(expectedHandDetails).toMatchSnapshot();
    });
  });

  describe("When receives a completeFakeHand with hero as winner by props", () => {
    test("Then it should render every property from the completeFakeHand object", () => {
      completeFakeHand.postGame.gameWinner = "hero";
      const expectedHandDetails = renderer.create(
        <HandDetails hand={completeFakeHand} />
      );

      expect(expectedHandDetails).toMatchSnapshot();
    });
  });
});
