import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";

describe("Given an App component", () => {
  describe("When there is no token", () => {
    describe("And the path is /home", () => {
      test("Then it should redirect to the login page", () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/home"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Login" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is /register", () => {
      test("Then it should redirect to the login page", () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/register"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Register" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is anything else", () => {
      test("Then it should redirect to the login page", () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/create"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Login" });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When the path is an unknown one", () => {
    test("Then it should redirect to the not found page", () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/odmvvmdvñlkdasv"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      const heading = screen.getByRole("heading", { name: "Page not found" });

      expect(heading).toBeInTheDocument();
    });
  });
});
