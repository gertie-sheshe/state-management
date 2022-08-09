import { render } from "../../tests/utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { worker } from "../../tests/mocks/server";
import { queryClient } from "../../tests/utils.js";
import { fetchUsersError, fetchUsersNoTodos } from "../../tests/mocks/handlers";

import App from "./App";

describe("App", () => {
  beforeAll(() => worker.listen({ onUnhandledRequest: "warn" }));
  afterEach(() => {
    worker.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => {
    worker.close();
  });
  test("Matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Shows "Select User" option', async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
  });

  test("Shows users", async () => {
    render(<App />);
    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(await screen.findByText("Ervin Howell")).toBeInTheDocument();
    expect(await screen.findByText("Clementine Bauch")).toBeInTheDocument();
    expect(await screen.findByText("Patricia Lebsack")).toBeInTheDocument();
  });

  test('Should correctly set default option to "Select User"', async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Select User", selected: true })
    ).toBeInTheDocument();
  });

  it("should display the correct number of options", async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(5);
  });

  test('Should correctly set selected option to "Ervin Howell"', async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    userEvent.selectOptions(screen.getByRole("combobox"), "2");

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: "Ervin Howell", selected: true })
      ).toBeInTheDocument();
    });
  });

  test("Should enable Add Todo button when a user is selected", async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    userEvent.selectOptions(screen.getByRole("combobox"), "2");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Add" }).disabled).toBe(false);
    });
  });

  test("Should disable Add Todo button when a user is not selected", async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Add" }).disabled).toBe(true);
    });
  });

  test("Should show error message when fetch users fails", async () => {
    worker.use(fetchUsersError);
    render(<App />);
    expect(await screen.findByText("Error:")).toBeInTheDocument();
  });

  test("Should show list of todos when a user is selected", async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    userEvent.selectOptions(screen.getByRole("combobox"), "2");

    await waitFor(() => {
      expect(screen.getByText("delectus aut autem")).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        "laboriosam mollitia et enim quasi adipisci quia provident illum"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("molestiae perspiciatis ipsa")).toBeInTheDocument();
    expect(screen.getByText("et doloremque nulla")).toBeInTheDocument();
    expect(screen.getByText("home alone")).toBeInTheDocument();
  });

  test("Should show no todos when a user is selected and has no todos", async () => {
    worker.use(fetchUsersNoTodos);
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    userEvent.selectOptions(screen.getByRole("combobox"), "4");

    await waitFor(() => {
      expect(screen.getByText("No todos found")).toBeInTheDocument();
    });
  });
});
