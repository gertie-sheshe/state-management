import { render } from "../../tests/utils";
import Users from "./Users";
import { screen } from "@testing-library/react";
import { worker } from "../../tests/mocks/server";

describe("Users", () => {
  beforeAll(() => worker.listen());
  afterEach(() => worker.resetHandlers());
  afterAll(() => worker.close());

  test("Matches snapshot", () => {
    const { asFragment } = render(<Users />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Shows loading state", async () => {
    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Shows users", async () => {
    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await screen.findByText("Leanne Graham");
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    expect(screen.getByText("Clementine Bauch")).toBeInTheDocument();
    expect(screen.getByText("Patricia Lebsack")).toBeInTheDocument();
  });
});
