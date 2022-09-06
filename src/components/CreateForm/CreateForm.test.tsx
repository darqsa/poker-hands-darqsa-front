import { fireEvent, render, screen } from "@testing-library/react";
import CreateForm from "./CreateForm";

describe("Given a CreateForm component", () => {
  describe("When invoked and is firstPage", () => {
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
        screen.getAllByLabelText("*Position"),
        screen.getAllByLabelText("*Stack"),
        screen.getAllByLabelText("*Hand"),
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
          position: screen.getAllByLabelText(
            "*Position"
          )[0] as HTMLInputElement,
          stack: screen.getAllByLabelText("*Stack")[0] as HTMLInputElement,
          hand: screen.getAllByLabelText("*Hand")[0] as HTMLInputElement,
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
});
