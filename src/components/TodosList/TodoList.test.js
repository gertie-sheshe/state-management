import { render } from "../../tests/utils";
import TodoList from "./TodoList";

describe("TodoList", () => {
  const stubbedTodos = {
    error: false,
    isLoading: false,
    data: [
      {
        userId: 1,
        id: 13,
        title: "et doloremque nulla",
        completed: false,
      },
      {
        title: "home alone",
        completed: false,
        userId: "1",
        id: 14,
      },
    ],
  };
  it("matches snapshot", () => {
    const { asFragment } = render(<TodoList {...stubbedTodos} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
