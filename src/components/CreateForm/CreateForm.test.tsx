import { render, screen } from "@testing-library/react";
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
  });
});
