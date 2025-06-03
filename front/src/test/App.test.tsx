import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "../App";

describe("Layout", () => {
  it("renders the header", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: "My Todo App" })).toBeInTheDocument();
  });
});

describe("Todo List", () => {
  it("renders the todo list", () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getAllByRole("listitem", { name: /todo : / })).toHaveLength(4);
  });
});

describe("About", () => {
  it("renders the about page", async () => {
    // Given
    render(<MemoryRouter><App /></MemoryRouter>);
    // When
    const $aboutLink = screen.getByRole("link", { name: "About" });
    userEvent.click($aboutLink);
    // Then
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "About" })).toBeInTheDocument();
    })
  });
});

describe("Create Todo", () => {
  it("creates a new todo", async () => {
    // Given
    render(<MemoryRouter><App /></MemoryRouter>);
    // When
    const $input = screen.getByRole("textbox", { name: "New Todo" });
    const $button = screen.getByRole("button", { name: "Create" });
    userEvent.type($input, "New Todo");
    userEvent.click($button);
    // Then
    await waitFor(() => {
      expect(screen.getByRole("listitem", { name: /todo : New Todo/ })).toBeInTheDocument();
    });
  });
});
