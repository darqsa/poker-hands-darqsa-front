import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Given a Header component", () => {
  describe("When invoked and the page is login", () => {
    test("Then it should return a login heading", () => {
      render(
        <MemoryRouter initialEntries={["/login"]}>
          <Header />
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading", { name: "Login" });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is register", () => {
    test("Then it should return a register heading and a KeyboardArrowLeftIcon", () => {
      render(
        <MemoryRouter initialEntries={["/register"]}>
          <Header />
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading", { name: "Register" });
      const icon = screen.getByTestId("arrow-left");

      expect(heading).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is details", () => {
    test("Then it should return a details heading, KeyboardArrowLeftIcon and a EditIcon", () => {
      render(
        <MemoryRouter initialEntries={["/details"]}>
          <Header />
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading", { name: "Details" });
      const icon1 = screen.getByTestId("arrow-left");
      const icon2 = screen.getByTestId("edit");

      expect(heading).toBeInTheDocument();
      expect(icon1).toBeInTheDocument();
      expect(icon2).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is hands", () => {
    test("Then it should return a hands heading, AddIcon and a PersionIcon", () => {
      render(
        <MemoryRouter initialEntries={["/home"]}>
          <Header />
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading", { name: "Hands" });
      const icon1 = screen.getByTestId("add");
      const icon2 = screen.getByTestId("user");

      expect(heading).toBeInTheDocument();
      expect(icon1).toBeInTheDocument();
      expect(icon2).toBeInTheDocument();
    });
  });

  describe("When invoked and the page is create", () => {
    test("Then it should return a create heading, KeyboardArrowLeftIcon", () => {
      render(
        <MemoryRouter initialEntries={["/create"]}>
          <Header />
        </MemoryRouter>
      );

      const heading = screen.getByRole("heading", { name: "Create" });
      const icon = screen.getByTestId("arrow-left");

      expect(heading).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });
});
