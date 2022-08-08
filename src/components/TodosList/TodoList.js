import React from "react";
import Todo from "../Todo/Todo";

function TodoList({ error, isLoading, data }) {
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form>
      <ul style={{ listStyleType: "none" }}>
        {data?.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      {data?.length === 0 && <p>No todos found</p>}
    </form>
  );
}

export default TodoList;
