import { render } from "../../tests/utils";
import { screen } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<TodoForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("shows input field with an empty value", () => {
    render(<TodoForm />);
    expect(screen.getByRole("textbox").value).toBe("");
  });

  it("shows disabled button when userId is not provided", () => {
    render(<TodoForm />);
    expect(screen.getByRole("button").disabled).toBe(true);
  });

  it("shows enabled button when userId is provided", () => {
    render(<TodoForm userId={1} />);
    expect(screen.getByRole("button").disabled).toBe(false);
  });

  it("shows disabled input field when userId is not provided", () => {
    render(<TodoForm />);
    expect(screen.getByRole("textbox").disabled).toBe(true);
  });

  it("shows enabled input field when userId is provided", () => {
    render(<TodoForm userId={1} />);
    expect(screen.getByRole("textbox").disabled).toBe(false);
  });
});
