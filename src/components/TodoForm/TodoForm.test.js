import { render } from "../../tests/utils";
import TodoForm from "./TodoForm";

describe("TodoForm", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<TodoForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
