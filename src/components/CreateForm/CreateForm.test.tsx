import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import CreateForm from "./CreateForm";

let mockCreateFunction = { createHand: jest.fn() };
jest.mock(
  "../../features/hands/hooks/useHandsApi",
  () => () => mockCreateFunction
);

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a CreateForm component", () => {
  describe("When is firstPage", () => {
    test("Then it should render 3 headings", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateForm />
          </Provider>
        </BrowserRouter>
      );

      const gameInfoForm = [
        screen.getByRole("heading", { name: "Game info" }),
        screen.getByRole("heading", { name: "Hero" }),
        screen.getByRole("heading", { name: "Villain" }),
      ];

      gameInfoForm.forEach((input) => expect(input).toBeInTheDocument());
    });

    test("Then it should render 2 position, stack and hand inputs", () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateForm />
          </Provider>
        </BrowserRouter>
      );
      const expectedInputs = 2;
      const gameInfoForm = [
        screen.getAllByLabelText("* Position"),
        screen.getAllByLabelText("* Stack"),
        screen.getAllByLabelText("* Hand"),
      ];

      gameInfoForm.forEach((input) =>
        expect(input).toHaveLength(expectedInputs)
      );
    });

    describe("And the user types in the position, stack and hand inputs", () => {
      test("Then it should render the value typed in the inputs", () => {
        const newText = "kkkkk";
        const newNumber = 2;
        render(
          <BrowserRouter>
            <Provider store={store}>
              <CreateForm />
            </Provider>
          </BrowserRouter>
        );
        const form = {
          position: screen.getAllByLabelText(
            "* Position"
          )[0] as HTMLInputElement,
          stack: screen.getAllByLabelText("* Stack")[0] as HTMLInputElement,
          hand: screen.getAllByLabelText("* Hand")[0] as HTMLInputElement,
        };

        fireEvent.change(form.position, { target: { value: newNumber } });
        fireEvent.change(form.stack, { target: { value: newNumber } });
        fireEvent.change(form.hand, {
          target: { value: newText },
        });

        expect(+form.position.value).toBe(newNumber);
        expect(+form.stack.value).toBe(newNumber);
        expect(form.hand.value).toBe(newText);
      });
    });
  });

  describe("When user clicks in the next page icon (current page 2)", () => {
    test("Then it should render a previous icon that renders back the page 1", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateForm />
          </Provider>
        </BrowserRouter>
      );
      const nextIcon = screen.getByTestId("next-first-page");
      await userEvent.click(nextIcon);

      const previousIcon = screen.getByTestId("previous-second-page");
      await userEvent.click(previousIcon);

      const expectedFirstPageHeading = screen.getByRole("heading", {
        name: "Game info",
      });

      expect(expectedFirstPageHeading).toBeInTheDocument();
    });
  });

  describe("When user clicks twice in the next page icon (current page 3)", () => {
    describe("And the user types in the winner and description inputs", () => {
      test("Then it should render the value typed in the inputs", async () => {
        const newText = "kkkkk";
        const newWinnerText = "hero";
        render(
          <BrowserRouter>
            <Provider store={store}>
              <CreateForm />
            </Provider>
          </BrowserRouter>
        );
        const nextIcon1 = screen.getByTestId("next-first-page");
        await userEvent.click(nextIcon1);
        const nextIcon2 = screen.getByTestId("next-second-page");
        await userEvent.click(nextIcon2);

        const form = {
          winner: screen.getByLabelText("* Winner") as HTMLInputElement,
          description: screen.getByLabelText("Description") as HTMLInputElement,
        };

        fireEvent.change(form.winner, { target: { value: newWinnerText } });
        fireEvent.change(form.description, { target: { value: newText } });

        expect(form.winner.value).toBe(newWinnerText);
        expect(form.description.value).toBe(newText);
      });
    });

    describe("And the user uploads an image in the Image input", () => {
      test("Then it should render the value uploaded in the input", async () => {
        const image = new File(["image"], "image.png", {
          type: "https://okdiario.com/img/2018/06/04/jugar-al-poker.jpg",
        });

        render(
          <BrowserRouter>
            <Provider store={store}>
              <CreateForm />
            </Provider>
          </BrowserRouter>
        );
        const nextIcon1 = screen.getByTestId("next-first-page");
        await userEvent.click(nextIcon1);
        const nextIcon2 = screen.getByTestId("next-second-page");
        await userEvent.click(nextIcon2);

        const imageInput = screen.getByLabelText("Image") as HTMLInputElement;
        await userEvent.upload(imageInput, image);

        const expectedImage = "C:\\fakepath\\image.png";

        expect(imageInput.value).toBe("");
      });
    });

    test("Then it should render a previous icon that renders back the page 2", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateForm />
          </Provider>
        </BrowserRouter>
      );
      const nextIcon1 = screen.getByTestId("next-first-page");
      await userEvent.click(nextIcon1);
      const nextIcon2 = screen.getByTestId("next-second-page");
      await userEvent.click(nextIcon2);

      const previousIcon = screen.getByTestId("previous-third-page");
      await userEvent.click(previousIcon);

      const expectedSecondPageHeading = screen.getByRole("heading", {
        name: "River",
      });

      expect(expectedSecondPageHeading).toBeInTheDocument();
    });
  });

  describe("When user types in every required field", () => {
    describe("And user clicks on the submit button", () => {
      test("Then it should call the create hand function", async () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <CreateForm />
            </Provider>
          </BrowserRouter>
        );
        const hand = {
          heroPosition: 2,
          villainPosition: 2,
          heroStack: 2,
          villainStack: 2,
          hand1: "Ah",
          hand2: "Ah",
          hand3: "Ah",
          hand4: "Ah",
          handName: "Fake Hand Name",
          preFlopActions: "Fake action",
          preFlopPot: 2,
          gameWinner: "hero",
        };

        const firstPageForm = {
          heroPosition: screen.getAllByLabelText(
            "* Position"
          )[0] as HTMLInputElement,
          villainPosition: screen.getAllByLabelText(
            "* Position"
          )[1] as HTMLInputElement,
          heroStack: screen.getAllByLabelText("* Stack")[0] as HTMLInputElement,
          villainStack: screen.getAllByLabelText(
            "* Stack"
          )[1] as HTMLInputElement,
          heroHand1: screen.getAllByLabelText("* Hand")[0] as HTMLInputElement,
          heroHand2: screen.getByTestId("hero-hand-2") as HTMLInputElement,
          villainHand1: screen.getAllByLabelText(
            "* Hand"
          )[1] as HTMLInputElement,
          villainHand2: screen.getByTestId(
            "villain-hand-2"
          ) as HTMLInputElement,
          handName: screen.getByLabelText("* Hand name") as HTMLInputElement,
        };

        fireEvent.change(firstPageForm.heroPosition, {
          target: { value: hand.heroPosition },
        });
        fireEvent.change(firstPageForm.villainPosition, {
          target: { value: hand.villainPosition },
        });
        await userEvent.click(firstPageForm.heroStack);
        await userEvent.keyboard(`${hand.heroStack}`);
        await userEvent.click(firstPageForm.villainStack);
        await userEvent.keyboard(`${hand.villainStack}`);
        await userEvent.type(firstPageForm.heroHand1, `${hand.hand1}`);
        await userEvent.type(firstPageForm.heroHand2, `${hand.hand2}`);
        await userEvent.type(firstPageForm.villainHand1, `${hand.hand3}`);
        await userEvent.type(firstPageForm.villainHand2, `${hand.hand4}`);
        await userEvent.type(firstPageForm.handName, `${hand.handName}`);

        const nextIcon1 = screen.getByTestId("next-first-page");
        await userEvent.click(nextIcon1);

        const secondPageForm = {
          preFlopActions: screen.getByLabelText(
            "* Actions"
          ) as HTMLInputElement,
          preFlopPot: screen.getByLabelText("* Pot") as HTMLInputElement,
        };

        await userEvent.type(
          secondPageForm.preFlopActions,
          `${hand.preFlopActions}`
        );
        await userEvent.click(secondPageForm.preFlopPot);
        await userEvent.keyboard(`${hand.preFlopPot}`);

        const nextIcon2 = screen.getByTestId("next-second-page");
        await userEvent.click(nextIcon2);

        const thirdPageForm = {
          gameWinner: screen.getByLabelText("* Winner") as HTMLInputElement,
        };

        fireEvent.change(thirdPageForm.gameWinner, {
          target: { value: hand.gameWinner },
        });

        const submitButton = screen.getByRole("button");
        await userEvent.click(submitButton);

        expect(mockCreateFunction.createHand).toHaveBeenCalled();
      });
    });
  });

  describe("When user types in every field", () => {
    describe("And user clicks on the submit button", () => {
      test("Then it should call the create hand function with the object completed", async () => {
        render(
          <BrowserRouter>
            <Provider store={store}>
              <CreateForm />
            </Provider>
          </BrowserRouter>
        );
        const hand = {
          heroPosition: 2,
          villainPosition: 2,
          heroStack: 2,
          villainStack: 2,
          hand1: "Ah",
          hand2: "Ah",
          hand3: "Ah",
          hand4: "Ah",
          handName: "Fake Hand Name",
          preFlopActions: "Fake action",
          preFlopPot: 2,
          flopActions: "Fake action",
          flopPot: 2,
          flopBoard1: "Ah",
          flopBoard2: "Ah",
          flopBoard3: "Ah",
          turnActions: "Fake action",
          turnPot: 2,
          turnBoard: "Ah",
          riverActions: "Fake action",
          riverPot: 2,
          riverBoard: "Ah",
          gameDescription: "Description example",
          gameWinner: "hero",
        };

        const firstPageForm = {
          heroPosition: screen.getAllByLabelText(
            "* Position"
          )[0] as HTMLInputElement,
          villainPosition: screen.getAllByLabelText(
            "* Position"
          )[1] as HTMLInputElement,
          heroStack: screen.getAllByLabelText("* Stack")[0] as HTMLInputElement,
          villainStack: screen.getAllByLabelText(
            "* Stack"
          )[1] as HTMLInputElement,
          heroHand1: screen.getAllByLabelText("* Hand")[0] as HTMLInputElement,
          heroHand2: screen.getByTestId("hero-hand-2") as HTMLInputElement,
          villainHand1: screen.getAllByLabelText(
            "* Hand"
          )[1] as HTMLInputElement,
          villainHand2: screen.getByTestId(
            "villain-hand-2"
          ) as HTMLInputElement,
          handName: screen.getByLabelText("* Hand name") as HTMLInputElement,
        };

        fireEvent.change(firstPageForm.heroPosition, {
          target: { value: hand.heroPosition },
        });
        fireEvent.change(firstPageForm.villainPosition, {
          target: { value: hand.villainPosition },
        });
        await userEvent.click(firstPageForm.heroStack);
        await userEvent.keyboard(`${hand.heroStack}`);
        await userEvent.click(firstPageForm.villainStack);
        await userEvent.keyboard(`${hand.villainStack}`);
        await userEvent.type(firstPageForm.heroHand1, `${hand.hand1}`);
        await userEvent.type(firstPageForm.heroHand2, `${hand.hand2}`);
        await userEvent.type(firstPageForm.villainHand1, `${hand.hand3}`);
        await userEvent.type(firstPageForm.villainHand2, `${hand.hand4}`);
        await userEvent.type(firstPageForm.handName, `${hand.handName}`);

        const nextIcon1 = screen.getByTestId("next-first-page");
        await userEvent.click(nextIcon1);

        const secondPageForm = {
          preFlopActions: screen.getByLabelText(
            "* Actions"
          ) as HTMLInputElement,
          preFlopPot: screen.getByLabelText("* Pot") as HTMLInputElement,
          flopActions: screen.getAllByLabelText(
            "Actions"
          )[0] as HTMLInputElement,
          flopPot: screen.getAllByLabelText("Pot")[0] as HTMLInputElement,
          flopHand1: screen.getAllByLabelText("Board")[0] as HTMLInputElement,
          flopHand2: screen.getByTestId("board-hand2") as HTMLInputElement,
          flopHand3: screen.getByTestId("board-hand3") as HTMLInputElement,
          turnActions: screen.getAllByLabelText(
            "Actions"
          )[1] as HTMLInputElement,
          turnPot: screen.getAllByLabelText("Pot")[1] as HTMLInputElement,
          turnHand: screen.getAllByLabelText("Board")[1] as HTMLInputElement,
          riverActions: screen.getAllByLabelText(
            "Actions"
          )[2] as HTMLInputElement,
          riverPot: screen.getAllByLabelText("Pot")[2] as HTMLInputElement,
          riverHand: screen.getAllByLabelText("Board")[2] as HTMLInputElement,
        };

        await userEvent.type(
          secondPageForm.preFlopActions,
          `${hand.preFlopActions}`
        );
        await userEvent.type(secondPageForm.flopActions, `${hand.flopActions}`);
        await userEvent.type(secondPageForm.turnActions, `${hand.turnActions}`);
        await userEvent.type(
          secondPageForm.riverActions,
          `${hand.riverActions}`
        );
        await userEvent.type(secondPageForm.flopHand1, `${hand.flopBoard1}`);
        await userEvent.type(secondPageForm.flopHand2, `${hand.flopBoard2}`);
        await userEvent.type(secondPageForm.flopHand3, `${hand.flopBoard3}`);
        await userEvent.type(secondPageForm.turnHand, `${hand.turnBoard}`);
        await userEvent.type(secondPageForm.riverHand, `${hand.riverBoard}`);
        await userEvent.click(secondPageForm.preFlopPot);
        await userEvent.keyboard(`${hand.preFlopPot}`);
        await userEvent.click(secondPageForm.flopPot);
        await userEvent.keyboard(`${hand.flopPot}`);
        await userEvent.click(secondPageForm.turnPot);
        await userEvent.keyboard(`${hand.turnPot}`);
        await userEvent.click(secondPageForm.riverPot);
        await userEvent.keyboard(`${hand.riverPot}`);

        const nextIcon2 = screen.getByTestId("next-second-page");
        await userEvent.click(nextIcon2);

        const thirdPageForm = {
          gameWinner: screen.getByLabelText("* Winner") as HTMLInputElement,
          description: screen.getByLabelText("Description") as HTMLInputElement,
        };

        fireEvent.change(thirdPageForm.gameWinner, {
          target: { value: hand.gameWinner },
        });
        await userEvent.type(
          thirdPageForm.description,
          `${hand.gameDescription}`
        );

        const submitButton = screen.getByRole("button");
        await userEvent.click(submitButton);

        expect(mockCreateFunction.createHand).toHaveBeenCalled();
      });
    });
  });

  describe("When user don't type in every required field and try to click submit button", () => {
    test("Then it should show the text 'Please complete *required fields'", async () => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <CreateForm />
          </Provider>
        </BrowserRouter>
      );
      const nextIcon1 = screen.getByTestId("next-first-page");
      await userEvent.click(nextIcon1);
      const nextIcon2 = screen.getByTestId("next-second-page");
      await userEvent.click(nextIcon2);

      const submitButton = screen.getByTestId("DoneIcon");
      await userEvent.click(submitButton);

      const text = screen.getByText("Please complete *required fields");

      expect(text).toBeInTheDocument();
    });
  });
});
