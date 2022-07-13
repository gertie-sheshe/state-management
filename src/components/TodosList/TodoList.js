import React from "react";

function TodoList({ todos }) {
  if (!todos.length) {
    return null;
  }

  return (
    <>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
}

export default TodoList;
