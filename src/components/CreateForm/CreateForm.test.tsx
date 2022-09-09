import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import CreateForm from "./CreateForm";

let mockCreateFunction = { create: jest.fn(), login: jest.fn() };
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

        expect(imageInput.value).toBe(expectedImage);
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

  // describe("When user types in every required field", () => {
  //   describe("And user clicks on the submit button", () => {
  //     test("Then it should call the createHand function with the fakeHand", () => {
  //       render(
  //         <Provider store={store}>
  //           <CreateForm />
  //         </Provider>
  //       );
  //       const hand = {
  //         position: 2,
  //         stack: 2,
  //         hand: "Ah",
  //         handName: "Fake Hand Name",
  //         preFlopActions: "Fake action",
  //         preFlopPot: 2,
  //         gameWinner: "Me",
  //       };

  //       const firstPageForm = {
  //         heroPosition: screen.getAllByLabelText(
  //           "* Position"
  //         )[0] as HTMLInputElement,
  //         villainPosition: screen.getAllByLabelText(
  //           "* Position"
  //         )[1] as HTMLInputElement,
  //         heroStack: screen.getAllByLabelText("* Stack")[0] as HTMLInputElement,
  //         villainStack: screen.getAllByLabelText(
  //           "* Stack"
  //         )[1] as HTMLInputElement,
  //         heroHand1: screen.getAllByLabelText("* Hand")[0] as HTMLInputElement,
  //         heroHand2: screen.getAllByTestId("hand")[0] as HTMLInputElement,
  //         villainHand1: screen.getAllByLabelText(
  //           "* Hand"
  //         )[1] as HTMLInputElement,
  //         villainHand2: screen.getAllByTestId("hand")[1] as HTMLInputElement,
  //       };

  //       fireEvent.change(firstPageForm.heroPosition, {
  //         target: { value: hand.position },
  //       });
  //       fireEvent.change(firstPageForm.villainPosition, {
  //         target: { value: hand.position },
  //       });
  //       fireEvent.change(firstPageForm.heroStack, {
  //         target: { value: hand.stack },
  //       });
  //       fireEvent.change(firstPageForm.villainStack, {
  //         target: { value: hand.stack },
  //       });
  //       fireEvent.change(firstPageForm.heroHand1, {
  //         target: { value: hand.hand },
  //       });
  //       fireEvent.change(firstPageForm.heroHand2, {
  //         target: { value: hand.hand },
  //       });
  //       fireEvent.change(firstPageForm.villainHand1, {
  //         target: { value: hand.hand },
  //       });
  //       fireEvent.change(firstPageForm.villainHand2, {
  //         target: { value: hand.hand },
  //       });
  //     });
  //   });
  // });
});
