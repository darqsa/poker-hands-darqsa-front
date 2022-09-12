import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { openAlertActionCreator } from "../../features/ui/slices/uiSlice";
import Register from "./Register";

let mockRegisterFunction = { register: jest.fn(), login: jest.fn() };
jest.mock(
  "../../features/users/hooks/useUserApi",
  () => () => mockRegisterFunction
);

const mockUseDispatch = jest.fn();

jest.mock("../../app/hooks", () => ({
  ...jest.requireActual("../../app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

describe("Given a register component", () => {
  describe("When instantiated", () => {
    test("Then it should render a heading, username, password and repeatPassword inputs and a submit button", () => {
      render(<Register />);
      const form = [
        screen.getByRole("heading", { name: "Create your account" }),
        screen.getByLabelText("Username"),
        screen.getByLabelText("Password"),
        screen.getByLabelText("Repeat password"),
        screen.getByRole("button", { name: "Register" }),
      ];

      form.forEach((input) => expect(input).toBeInTheDocument());
    });
  });

  describe("When instantiated and the user types in", () => {
    test("Then it should render a username, password and repeatPassword inputs with the text 'kkkkk'", () => {
      const newText = "kkkkk";
      render(<Register />);
      const form = {
        username: screen.getByLabelText("Username") as HTMLInputElement,
        password: screen.getByLabelText("Password") as HTMLInputElement,
        repeatPassword: screen.getByLabelText(
          "Repeat password"
        ) as HTMLInputElement,
      };

      fireEvent.change(form.username, { target: { value: newText } });
      fireEvent.change(form.password, { target: { value: newText } });
      fireEvent.change(form.repeatPassword, {
        target: { value: newText },
      });

      expect(form.username.value).toBe(newText);
      expect(form.password.value).toBe(newText);
      expect(form.repeatPassword.value).toBe(newText);
    });

    describe("And the user type is not valid", () => {
      test("Then the button should be disabled", () => {
        const newInvalidText = "kkk";
        render(<Register />);
        const form = {
          username: screen.getByLabelText("Username") as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByLabelText(
            "Repeat password"
          ) as HTMLInputElement,
        };
        const button = screen.getByRole("button", { name: "Register" });

        fireEvent.change(form.username, { target: { value: newInvalidText } });
        fireEvent.change(form.password, { target: { value: newInvalidText } });
        fireEvent.change(form.repeatPassword, {
          target: { value: newInvalidText },
        });

        expect(button).toBeDisabled();
      });
    });

    test("Then it should call the mockRegister function with the new text", async () => {
      const newText = "kkkkk";
      render(<Register />);
      const form = {
        username: screen.getByLabelText("Username") as HTMLInputElement,
        password: screen.getByLabelText("Password") as HTMLInputElement,
        repeatPassword: screen.getByPlaceholderText(
          "Repeat your password"
        ) as HTMLInputElement,
      };

      fireEvent.change(form.username, { target: { value: newText } });
      fireEvent.change(form.password, { target: { value: newText } });
      fireEvent.change(form.repeatPassword, {
        target: { value: newText },
      });
      const submit = screen.getByRole("button", { name: "Register" });
      await userEvent.click(submit);
      const registerData = {
        username: newText,
        password: newText,
      };

      expect(mockRegisterFunction.register).toHaveBeenCalledWith(registerData);
      expect(mockRegisterFunction.login).toHaveBeenCalledWith(registerData);
    });

    test("Then it should call the mockDispatcher with the openAlertActionCreator", async () => {
      const newText = "kkkkk";
      const alertText = "Your account has been created successfully! 👍";
      render(<Register />);
      const form = {
        username: screen.getByLabelText("Username") as HTMLInputElement,
        password: screen.getByLabelText("Password") as HTMLInputElement,
        repeatPassword: screen.getByPlaceholderText(
          "Repeat your password"
        ) as HTMLInputElement,
      };

      fireEvent.change(form.username, { target: { value: newText } });
      fireEvent.change(form.password, { target: { value: newText } });
      fireEvent.change(form.repeatPassword, {
        target: { value: newText },
      });
      const submit = screen.getByRole("button", { name: "Register" });
      await userEvent.click(submit);

      expect(mockUseDispatch).toHaveBeenCalledWith(
        openAlertActionCreator(alertText)
      );
    });

    describe("And the user type different passwords", () => {
      test("Then it shouldn't call the mockRegister function", async () => {
        const newText = "kkkkk";
        const repeatPasswordNewText = "kkkkkk";
        render(<Register />);
        const form = {
          username: screen.getByLabelText("Username") as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByPlaceholderText(
            "Repeat your password"
          ) as HTMLInputElement,
        };

        fireEvent.change(form.username, { target: { value: newText } });
        fireEvent.change(form.password, { target: { value: newText } });
        fireEvent.change(form.repeatPassword, {
          target: { value: repeatPasswordNewText },
        });
        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        expect(mockRegisterFunction.register).not.toHaveBeenCalled();
      });
    });

    describe("And the user types an already used username", () => {
      test("Then it render the text 'Username already taken", async () => {
        mockRegisterFunction = {
          register: jest.fn().mockRejectedValue(new Error()),
          login: jest.fn(),
        };
        const errorText = "Username already taken";
        const newText = "kkkkk";
        render(<Register />);
        const form = {
          username: screen.getByLabelText("Username") as HTMLInputElement,
          password: screen.getByLabelText("Password") as HTMLInputElement,
          repeatPassword: screen.getByPlaceholderText(
            "Repeat your password"
          ) as HTMLInputElement,
        };

        fireEvent.change(form.username, { target: { value: newText } });
        fireEvent.change(form.password, { target: { value: newText } });
        fireEvent.change(form.repeatPassword, {
          target: { value: newText },
        });

        const submit = screen.getByRole("button", { name: "Register" });
        await userEvent.click(submit);

        const expectedText = screen.getByText(errorText);

        expect(expectedText).toBeInTheDocument();
      });
    });
  });
});
