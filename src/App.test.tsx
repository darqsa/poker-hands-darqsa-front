import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import { closeAlertActionCreator } from "./features/ui/slices/uiSlice";
import mockStore from "./test-utils/mocks/mockStore";

const mockUseDispatch = jest.fn();

jest.mock("./app/hooks", () => ({
  ...jest.requireActual("./app/hooks"),
  useAppDispatch: () => mockUseDispatch,
}));

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

    describe("And the route is /hand/edit/handId", () => {
      test("Then it should redirect to the edit page", () => {
        render(
          <Provider store={store}>
            <MemoryRouter
              initialEntries={["/hand/edit/631e0675f6f24c8fc0e6038d"]}
            >
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

  describe("When there is a token", () => {
    describe("And the path is /home", () => {
      test("Then it should redirect to the home page", () => {
        localStorage.setItem("token", "12345");
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/home"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Hands" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is /register", () => {
      test("Then it should redirect to the home page", () => {
        localStorage.setItem("token", "12345");
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/register"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Hands" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is /login", () => {
      test("Then it should redirect to the home page", () => {
        localStorage.setItem("token", "12345");
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/login"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Hands" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is /create", () => {
      test("Then it should redirect to the create page", () => {
        localStorage.setItem("token", "12345");
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/create"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Create" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is /hand/:handId", () => {
      test("Then it should redirect to the hand page", () => {
        localStorage.setItem("token", "12345");
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/hand/631e0675f6f24c8fc0e6038d"]}>
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Hand" });

        expect(heading).toBeInTheDocument();
      });
    });

    describe("And the route is /hand/edit/handId", () => {
      test("Then it should redirect to the edit page", () => {
        localStorage.setItem("token", "12345");
        render(
          <Provider store={store}>
            <MemoryRouter
              initialEntries={["/hand/edit/631e0675f6f24c8fc0e6038d"]}
            >
              <App />
            </MemoryRouter>
          </Provider>
        );

        const heading = screen.getByRole("heading", { name: "Edit" });

        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe("When it receives a uistate from the store with isLoading:true", () => {
    test("Then it should render a circular progress component", () => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      const uiComponent = screen.getByRole("progressbar");

      expect(uiComponent).toBeInTheDocument();
    });
  });

  describe("When it receives a uistate from the store with isAlertShown:true", () => {
    test("Then it should render an alert with a closeIcon inside and onclick call the mockDispatch with closeAlertActionCreator", async () => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );

      const uiComponent = screen.getByTestId("CloseIcon");
      await userEvent.click(uiComponent);

      expect(uiComponent).toBeInTheDocument();
      expect(mockUseDispatch).toHaveBeenCalledWith(closeAlertActionCreator());
    });
  });
});
