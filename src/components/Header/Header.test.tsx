import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/store";
import Header from "./Header";

let mockLogoutFunction = { logout: jest.fn() };
jest.mock(
  "../../features/users/hooks/useUserApi",
  () => () => mockLogoutFunction
);

describe("Given a Header component", () => {
  describe("When invoked and the page is login", () => {
    test("Then it should return a login heading", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/login"]}>
            <Header />
          </MemoryRouter>
        </Provider>
      );

      const heading = screen.getByRole("heading", { name: "Login" });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is register", () => {
    test("Then it should return a register heading and a KeyboardArrowLeftIcon", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/register"]}>
            <Header />
          </MemoryRouter>
        </Provider>
      );

      const heading = screen.getByRole("heading", { name: "Register" });
      const icon = screen.getByTestId("arrow-left");

      expect(heading).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is details", () => {
    test("Then it should return a details heading, KeyboardArrowLeftIcon", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/hand/6316388ea1279da93a82f9db"]}>
            <Header />
          </MemoryRouter>
        </Provider>
      );

      const heading = screen.getByRole("heading", { name: "Hand" });
      const icon = screen.getByTestId("arrow-left");

      expect(heading).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is home", () => {
    test("Then it should return a hands heading, AddIcon and a PersionIcon", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home"]}>
            <Header />
          </MemoryRouter>
        </Provider>
      );

      const heading = screen.getByRole("heading", { name: "Hands" });
      const icon1 = screen.getByTestId("add");
      const icon2 = screen.getByTestId("user");

      expect(heading).toBeInTheDocument();
      expect(icon1).toBeInTheDocument();
      expect(icon2).toBeInTheDocument();
    });

    describe("And the user clicks in the icon2", () => {
      test("Then it should render a Profile menu", async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/home"]}>
              <Header />
            </MemoryRouter>
          </Provider>
        );
        const icon = screen.getByTestId("user");
        await userEvent.click(icon);

        const logoutButton = screen.getByTestId("logout");

        expect(logoutButton).toBeInTheDocument();
      });

      describe("And the user clicks in the logout icon", () => {
        test("Then it should render a Profile menu", async () => {
          render(
            <Provider store={store}>
              <MemoryRouter initialEntries={["/home"]}>
                <Header />
              </MemoryRouter>
            </Provider>
          );
          const icon = screen.getByTestId("user");
          await userEvent.click(icon);

          const logoutButton = screen.getByTestId("logout");
          await userEvent.click(logoutButton);

          expect(mockLogoutFunction.logout).toHaveBeenCalled();
        });
      });
    });

    describe("When invoked and the page is create", () => {
      test("Then it should return a create heading, KeyboardArrowLeftIcon", () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/create"]}>
              <Header />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Create" });
        const icon = screen.getByTestId("arrow-left");

        expect(heading).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
      });
    });
  });
});
