import { render } from "../../tests/utils";
import App from "./App";

describe("App", () => {
  test("Matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
