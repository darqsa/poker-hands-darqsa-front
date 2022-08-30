import { fireEvent, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Register from "./Register";

// const registerMock = jest.mock(
//   "../../features/users/hooks/useUserApi",
//   () => () => ({
//     register: jest.fn(),
//   })
// );

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
    // test("Then it should call the mockRegister function with the new text", async () => {
    //   const newText = "kkkkk";
    //   render(<Register />);
    //   const form = {
    //     username: screen.getByLabelText("Username") as HTMLInputElement,
    //     password: screen.getByLabelText("Password") as HTMLInputElement,
    //     repeatPassword: screen.getByLabelText(
    //       "Repeat password"
    //     ) as HTMLInputElement,
    //   };

    //   fireEvent.change(form.username, { target: { value: newText } });
    //   fireEvent.change(form.password, { target: { value: newText } });
    //   fireEvent.change(form.repeatPassword, {
    //     target: { value: newText },
    //   });

    //   const submit = screen.getByRole("button", { name: "Register" });
    //   await userEvent.click(submit);
    //   const registerData = {
    //     name: form.username.value,
    //     password: form.password.value,
    //   };

    //   expect(registerMock).toHaveBeenCalledWith(registerData);
    // });
    // falta tambien comprobar que cuando clico y las pass son diferentes no se envia nada
  });
});
