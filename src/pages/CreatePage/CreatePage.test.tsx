import { render, screen } from "@testing-library/react";
import CreatePage from "./CreatePage";

describe("Given a create page component", () => {
  describe("When invoked", () => {
    test("Then it should render the Create Form component", () => {
      render(<CreatePage />);

      const expectedHeading = screen.getByRole("heading", {
        name: "Game info",
      });

      expect(expectedHeading).toBeInTheDocument();
    });
  });
});
