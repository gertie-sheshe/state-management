import { render } from "../../tests/utils";
import Todo from "./Todo";

describe("Todo", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Todo todo={{ title: "test" }} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
