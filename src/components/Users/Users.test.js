import { render } from "../../tests/utils";
import Users from "./Users";
import { screen } from "@testing-library/react";
import { server } from "../../tests/mocks/server";
import { fetchUsersError } from "../../tests/mocks/handlers";
import { queryClient } from "../../tests/utils.js";

describe("Users", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
  beforeEach(() => queryClient.clear());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => {
    server.close();
  });

  test("Matches snapshot", () => {
    const { asFragment } = render(<Users />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("Shows loading state", () => {
    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Shows users", async () => {
    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await screen.findByText("Select User");
  });

  test("Shows error state", async () => {
    server.use(fetchUsersError);
    render(<Users />);
    expect(await screen.findByText("Error:")).toBeInTheDocument();
  });
});

/// https://github.com/mswjs/msw/issues/251
// https://github.com/TanStack/query/discussions/1441
// Look into the caching and request interception - currently it's not working
