import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateForm from "./CreateForm";

describe("Given a CreateForm component", () => {
  describe("When is firstPage", () => {
    test("Then it should render 3 headings", () => {
      render(<CreateForm />);

      const gameInfoForm = [
        screen.getByRole("heading", { name: "Game info" }),
        screen.getByRole("heading", { name: "Hero" }),
        screen.getByRole("heading", { name: "Villain" }),
      ];

      gameInfoForm.forEach((input) => expect(input).toBeInTheDocument());
    });

    test("Then it should render 2 position, stack and hand inputs", () => {
      render(<CreateForm />);
      const expectedInputs = 2;
      const gameInfoForm = [
        screen.getAllByLabelText("Position"),
        screen.getAllByLabelText("Stack"),
        screen.getAllByLabelText("Hand"),
      ];

      gameInfoForm.forEach((input) =>
        expect(input).toHaveLength(expectedInputs)
      );
    });

    describe("And the user types in the position, stack and hand inputs", () => {
      test("Then it should render the value typed in the inputs", () => {
        const newText = "kkkkk";
        const newNumber = 2;
        render(<CreateForm />);
        const form = {
          position: screen.getAllByLabelText("Position")[0] as HTMLInputElement,
          stack: screen.getAllByLabelText("Stack")[0] as HTMLInputElement,
          hand: screen.getAllByLabelText("Hand")[0] as HTMLInputElement,
        };

        fireEvent.change(form.position, { target: { value: newText } });
        fireEvent.change(form.stack, { target: { value: newNumber } });
        fireEvent.change(form.hand, {
          target: { value: newText },
        });

        expect(form.position.value).toBe(newText);
        expect(+form.stack.value).toBe(newNumber);
        expect(form.hand.value).toBe(newText);
      });
    });
  });

  describe("When user clicks in the next page icon (current page 2)", () => {
    test("Then it should render a previous icon that renders back the page 1", async () => {
      render(<CreateForm />);
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
        render(<CreateForm />);
        const nextIcon1 = screen.getByTestId("next-first-page");
        await userEvent.click(nextIcon1);
        const nextIcon2 = screen.getByTestId("next-second-page");
        await userEvent.click(nextIcon2);

        const form = {
          winner: screen.getByLabelText("Winner") as HTMLInputElement,
          description: screen.getByLabelText("Description") as HTMLInputElement,
        };

        fireEvent.change(form.winner, { target: { value: newText } });
        fireEvent.change(form.description, { target: { value: newText } });

        expect(form.winner.value).toBe(newText);
        expect(form.description.value).toBe(newText);
      });
    });

    describe("And the user uploads an image in the Image input", () => {
      test("Then it should render the value uploaded in the input", async () => {
        const image = new File(["image"], "image.png", {
          type: "https://okdiario.com/img/2018/06/04/jugar-al-poker.jpg",
        });

        render(<CreateForm />);
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
      render(<CreateForm />);
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
});
