import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

const mockLoginFunction = { login: jest.fn() };
jest.mock(
  "../../features/users/hooks/useUserApi",
  () => () => mockLoginFunction
);

describe("Given a Login component", () => {
  describe("When instantiated", () => {
    test("Then it should render a heading, username, password and repeatPassword inputs and a submit button", () => {
      render(<Login />);
      const form = [
        screen.getByRole("heading", { name: "Login to see your PokerHands" }),
        screen.getByLabelText("Username"),
        screen.getByLabelText("Password"),
        screen.getByRole("button", { name: "Login" }),
      ];

      form.forEach((input) => expect(input).toBeInTheDocument());
    });
  });

  describe("When instantiated and the user types in", () => {
    test("Then it should render a username, password and repeatPassword inputs with the text 'kkkkk'", () => {
      const newText = "kkkkk";
      render(<Login />);
      const form = {
        username: screen.getByLabelText("Username") as HTMLInputElement,
        password: screen.getByLabelText("Password") as HTMLInputElement,
      };

      fireEvent.change(form.username, { target: { value: newText } });
      fireEvent.change(form.password, { target: { value: newText } });

      expect(form.username.value).toBe(newText);
      expect(form.password.value).toBe(newText);
    });

    describe("And the user type is not valid", () => {
      test("Then the button should be disabled", () => {
        const newInvalidText = "kkk";
        render(<Login />);
        const form = {
          username: screen.getByLabelText("Username") as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
        };

        const button = screen.getByRole("button", { name: "Login" });

        fireEvent.change(form.username, { target: { value: newInvalidText } });
        fireEvent.change(form.password, { target: { value: newInvalidText } });

        expect(button).toBeDisabled();
      });
    });

    test("Then it should call the mockLogin function with the new text", async () => {
      const newText = "kkkkk";
      render(<Login />);
      const form = {
        username: screen.getByLabelText("Username") as HTMLInputElement,
        password: screen.getByLabelText("Password") as HTMLInputElement,
      };

      fireEvent.change(form.username, { target: { value: newText } });
      fireEvent.change(form.password, { target: { value: newText } });

      const submit = screen.getByRole("button", { name: "Login" });
      await userEvent.click(submit);
      const loginData = {
        username: newText,
        password: newText,
      };

      expect(mockLoginFunction.login).toHaveBeenCalledWith(loginData);
    });
  });
});
