import { render } from "../../tests/utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { worker } from "../../tests/mocks/server";
import { queryClient } from "../../tests/utils.js";
import App from "./App";

describe("App", () => {
  beforeAll(() => worker.listen({ onUnhandledRequest: "warn" }));
  beforeEach(() => queryClient.clear());
  afterEach(() => {
    worker.resetHandlers();
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

  test("Should enable add Todo button when a user is selected", async () => {
    render(<App />);
    expect(await screen.findByText("Select User")).toBeInTheDocument();
    userEvent.selectOptions(screen.getByRole("combobox"), "2");

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Add" }).disabled).toBe(false);
    });
  });

  // test("Should allow user to select users", async () => {
  //   render(<App />);
  //   expect(await screen.findByText("Select User")).toBeInTheDocument();
  //   userEvent.selectOptions(screen.getByRole("combobox"), "1");
  //   // expect(screen.getByRole("button")).toBeDisabled();
  // });
});
