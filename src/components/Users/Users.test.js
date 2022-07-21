import { render } from "../../tests/utils";
import Users from "./Users";

describe("Users", () => {
  test("Matches snapshot", () => {
    const { asFragment } = render(<Users />);
    expect(asFragment()).toMatchSnapshot();
  });
});
