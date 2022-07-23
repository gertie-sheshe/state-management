import { render } from "../../tests/utils";
import { screen } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(
      <Todo todo={{ id: 1, title: "test", completed: false }} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it("shows checkbox with unchecked state", () => {
    render(<Todo todo={{ id: 1, title: "test", completed: false }} />);
    expect(screen.getByRole("checkbox").checked).toBe(false);
  });
  it("shows checkbox with checked state", () => {
    render(<Todo todo={{ id: 1, title: "test", completed: true }} />);
    expect(screen.getByRole("checkbox").checked).toBe(true);
  });
});
