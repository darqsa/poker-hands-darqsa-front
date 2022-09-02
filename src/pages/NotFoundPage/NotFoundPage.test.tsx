import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, useLocation } from "react-router-dom";
import Wrapper from "../../test-utils/Wrapper";
import NotFoundPage from "./NotFoundPage";

describe("Given a NotFound Page", () => {
  describe("When invoked", () => {
    test("Then it should render a heading", () => {
      render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      );

      const heading = screen.getByRole("heading", { name: "Page not found" });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should render a button that redirets to the /home page", async () => {
      render(
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      );

      const button = screen.getByRole("button", {
        name: "Go back to home page",
      });
      await userEvent.click(button);

      const {
        result: {
          current: { pathname },
        },
      } = renderHook(useLocation, { wrapper: Wrapper });

      expect(pathname).toBe("/home");
    });
  });
});
