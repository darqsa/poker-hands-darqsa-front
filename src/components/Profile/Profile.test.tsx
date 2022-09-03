import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/store";
import Profile from "./Profile";

const mockLogoutFunction = { logout: jest.fn() };
jest.mock(
  "../../features/users/hooks/useUserApi",
  () => () => mockLogoutFunction
);

describe("Given a Profile component", () => {
  describe("When invoked and the button with text 'Logout' is clicked", () => {
    test("Then it should call the logout function", async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/home"]}>
            <Profile />
          </MemoryRouter>
        </Provider>
      );
      const profileButton = screen.getByRole("button", { name: "Logout" });

      await userEvent.click(profileButton);

      expect(mockLogoutFunction.logout).toHaveBeenCalled();
    });
  });
});
