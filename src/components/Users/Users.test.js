import { render } from "../../tests/utils";
// import { QueryClient } from "react-query";
import Users from "./Users";
import { screen } from "@testing-library/react";
import { worker } from "../../tests/mocks/server";
import { fetchUsersError } from "../../tests/mocks/handlers";

describe("Users", () => {
  beforeAll(() => worker.listen());
  afterEach(() => {
    worker.resetHandlers();
  });
  afterAll(() => worker.close());

  test("Matches snapshot", () => {
    const { asFragment } = render(<Users />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Shows loading state", () => {
    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Shows error state", async () => {
    worker.use("http://localhost:3000/users", fetchUsersError);
    render(<Users />);
    expect(await screen.findByText("Error:")).toBeInTheDocument();
  });

  test("Shows users", async () => {
    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await screen.findByText("Select User");
  });
});
